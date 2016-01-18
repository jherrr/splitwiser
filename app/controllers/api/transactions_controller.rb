class Api::TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all.order(created_at: :desc).includes(:lender, :borrower)

    render 'index'
  end

  def create
    lender_id = params[:personToBePaid][:id]
    borrower_id = params[:payer][:id]
    dollar_amt = params[:dollar_amt].to_i
    event_date = params[:event_date]

    ActiveRecord::Base.transaction do
      current_to_current = {current_user_id: borrower_id, associate_id: borrower_id}
      current_to_other = {current_user_id: borrower_id, associate_id: lender_id}
      other_to_other = {current_user_id: lender_id, associate_id: lender_id}
      other_to_current = {current_user_id: lender_id, associate_id: borrower_id}

      @balances = {}

      balance = Balance.new(current_to_current)

      #either create new row, or update existing one
      if balance.valid?
        balance.amt_user_paid_back = dollar_amt
      else
        balance = Balance.find_by(current_to_current)
        balance.amt_user_paid_back += dollar_amt
      end

      balance.save!
      @balances[borrower_id] = balance

      balance = Balance.new(current_to_other)

      if balance.valid?
        balance.amt_user_is_paid_back = dollar_amt
      else
        balance = Balance.find_by(current_to_other)
        balance.amt_user_is_paid_back += dollar_amt
      end

      balance.save!
      @balances[lender_id] = balance

      balance = Balance.new(other_to_other)

      if balance.valid?
        balance.amt_user_is_paid_back = dollar_amt
      else
        balance = Balance.find_by(other_to_other)
        balance.amt_user_is_paid_back += dollar_amt
      end

      balance.save!

      balance = Balance.new(other_to_current)

      if balance.valid?
        balance.amt_user_paid_back = dollar_amt
      else
        balance = Balance.find_by(other_to_current)
        balance.amt_user_paid_back = dollar_amt
      end

      balance.save!

      Transaction.create!(lender_id: lender_id, borrower_id: borrower_id,
                          dollar_amt: dollar_amt, event_date: event_date)

    #end of transaction
    end

    render json: @balances
  end

end
