class Api::EventsController < ApplicationController
  def index
    @events = Event.all.includes(:lender)

    render 'index'
  end
end
