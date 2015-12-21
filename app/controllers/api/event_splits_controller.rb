class Api::EventSplitsController < ApplicationController

  def index
    puts "eventSplitsController reached"
    puts "params"
    puts params
    puts params[:event_id]
    @event_splits = EventSplit.where(event_id: params[:event_id]).includes(:user)

    render 'index'
  end

  def show
    user_id = params[:id]
    @event_splits = EventSplit.where(user_id: user_id)

    render 'show'
  end

  def owed_amount_current_user
    user_id = params[:id]
    @owed_amount = EventSplit.where(user_id: user_id).sum(:dollar_amt)

    render json: {owed_amount: @owed_amount}
  end

end
