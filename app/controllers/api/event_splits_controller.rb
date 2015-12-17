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
    @event_splits = EventSplit.where(user_id: params[:id])

    render 'show'
  end
end
