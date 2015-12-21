class Api::EventsController < ApplicationController
  def index
    @events = Event.all.includes(:lender)

    render 'index'
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

end
