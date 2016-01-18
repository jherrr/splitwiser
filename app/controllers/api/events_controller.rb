class Api::EventsController < ApplicationController
  def index
    @events = Event.all.includes(:lender)

    render 'index'
  end

  def show
    @events = Event.where(lender_id: params[:id]).order(event_date: :desc).includes(:lender)
    render 'show'
  end

  def create

    ActiveRecord::Base.transaction do

      lender_id = event_params[:lender_id]
      event = Event.new(event_params)
      event.save!
      event_id = event.id
      splits = params[:splits]

      @event = event

      #don't need to send this balance to render, it is queried and sent later on in this function
      balance = Balance.find_by current_user_id: lender_id, associate_id: lender_id
      pay_amt = round_dollar_amt(event_params[:dollar_amt])
      current_user_split_amt = round_dollar_amt(splits[lender_id])
      current_user_lend_amt = pay_amt - current_user_split_amt

      #only need to export current_user.id balances
      @balances = {}

      if balance

        balance.amt_user_is_owed += current_user_lend_amt
        balance.save!
      else
        puts "lender_id: "
        balance = Balance.create!(current_user_id: lender_id,
        amt_user_is_owed: current_user_lend_amt, associate_id: lender_id)
      end

      @balances[lender_id] = balance

      insertSplitData = []
      insertBalanceData = []

      splits.each do |key, value|
        split = {}
        split[:user_id] = key
        split[:dollar_amt] = value
        split[:event_id] = event_id

        insertSplitData.push(split)
      end

      event_splits = EventSplit.create!(insertSplitData);

      @event_splits = event_splits

      puts "splits: "
      puts splits

      #generate balances
      #delete lender_id, so we don't amt_user_owes ourselves, the lender
      splits.delete(lender_id)

      existing_current_to_other = {current_user_id: lender_id, associate_id: []}
      existing_other_to_other = {current_user_id: []}
      existing_other_to_current = {current_user_id: [], associate_id: lender_id}

      #if balance obj is valid, it is new combination of associate_id and current_user_id
      #thus create a new balance row if it is valid
      #else, balance obj is already existing for the combo of associate_id and current_user_id
      #we will find the existing rows and update them in the code after this loop
      splits.each do |associate_id, splitValue|
        dollar_amt = round_dollar_amt(splitValue)

        options = {current_user_id: lender_id,
         associate_id: associate_id, amt_user_owes: dollar_amt}
        current_to_other = Balance.new(options)

        if current_to_other.valid?
          current_to_other.save
          @balances[associate_id] = current_to_other
        else
          existing_current_to_other[:associate_id].push(associate_id)
        end

        options = {current_user_id: associate_id,
         associate_id: associate_id, amt_user_owes: dollar_amt}
        other_to_other = Balance.new(options)

        if other_to_other.valid?
          other_to_other.save
        else
          existing_other_to_other[:current_user_id].push(associate_id)
        end

        options = {current_user_id: associate_id,
         associate_id: lender_id, amt_user_is_owed: dollar_amt}
        other_to_current = Balance.new(options)

        if other_to_current.valid?
          other_to_current.save
        else
          existing_other_to_current[:current_user_id].push(associate_id)
        end

      end

      #find existing and update
      Balance.where(existing_current_to_other).each do |balance|
        balance.amt_user_owes += round_dollar_amt(splits[balance.associate_id.to_s])
        balance.save!
        @balances[balance.associate_id] = balance
      end

      Balance.where("associate_id = current_user_id").where(existing_other_to_other).each do
        |balance|
        balance.amt_user_owes += round_dollar_amt(splits[balance.current_user_id.to_s])
        balance.save!
      end

      Balance.where(existing_other_to_current).each do |balance|
        balance.amt_user_is_owed += round_dollar_amt(splits[balance.current_user_id.to_s])
        balance.save!
      end

    #end of transaction
    end

    puts "data: "
    puts @event
    puts @event_splits

    render 'create'
  end

  def lended_amount_current_user
    user_id = params[:id]
    lended_events = Event.where(lender_id: user_id)
    @lended_amount = lended_events.sum(:dollar_amt)

    # #includes for Active Record usually does two separate queries, until you add an aggregate function
    # like #sum to it, then it becomes a left outer join. Check Rails console to see 18 Dec 2015
    lended_events_joined = Event.where(lender_id: user_id).includes(:event_splits)

    # puts "events_sum:"
    # puts @lended_amount

    paid_back_amt = lended_events_joined.inject(0) do |accum, lended_event|
      event_splits = lended_event.event_splits

      sum = event_splits.where("user_id NOT IN (?)", user_id).sum(:dollar_amt)

      accum + sum
    end

    # puts "paid_back_sum:"
    # puts paid_back_amt

    @lended_amount -= paid_back_amt
    render json: {lended_amount: @lended_amount}
  end

  def owed_amount
    user_id = params[:id]

    events_ordered = Event.order(:lender_id).all
    event_splits_ordered = EventSplit.order(:event_id).where(user_id: user_id).all

    lender_output = Hash.new(0)
    # puts "events_ordered"
    # puts events_ordered.inspect
    # puts "event_splits_ordered"
    # puts event_splits_ordered.inspect
    # puts event_splits_ordered.length

    idy = 0
    idx = 0
    lender_id = events_ordered[idx].lender_id

    ida = 0

    while( idy < events_ordered.length && idx < events_ordered.length && ida < event_splits_ordered.length ) do
      # puts "event_ordered: "
      # puts events_ordered[idx]

      if ( events_ordered[idx].lender_id != lender_id )
        lender_id = events_ordered[idx].lender_id
        idy = idx
      end

      # puts "event_split_ordered: "
      # puts event_splits_ordered[ida]
      # puts "ida"
      # puts ida
      while( ida < event_splits_ordered.length && events_ordered[idx].id == event_splits_ordered[ida].event_id) do
        lender_output[lender_id] += event_splits_ordered[ida].dollar_amt

        puts event_splits_ordered[ida]
        ida += 1
      end

      idx += 1
    end

    # puts lender_output
    render json: lender_output
  end

  def lended_amount
    user_id = params[:id]

    event_ids_ordered = Event.order(:lender_id).where(lender_id: user_id).select(:id)
    event_splits_ordered = EventSplit.order(:event_id).where("event_id IN (?)", event_ids_ordered)

    lender_output = Hash.new(0)

    event_splits_ordered.each do |event|
      lender_output[event.user_id] += event.dollar_amt
    end
    puts lender_output

    render json: lender_output

  end

  private

  def event_params
    params.require(:event).permit(:lender_id, :description, :dollar_amt, :split_type,
      :event_date)
  end

  #str parameter from params
  #returns Integer
  def round_dollar_amt ( dollar_amt )
    dollar_amt.slice!(/\..*$/)
    dollar_amt = Integer(dollar_amt)
  end
end
