class Api::BalancesController < ApplicationController

  def show
    @balances = Balance.where(current_user_id: params[:id])

    render 'show'
  end
end
