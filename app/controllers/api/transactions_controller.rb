class Api::TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all.order(created_at: :desc).includes(:lender, :borrower)

    render 'index'
  end
end
