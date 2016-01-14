class Api::SessionsController < ApplicationController

  before_action :require_no_user!, only: [:create, :new]

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    @output = {}

    if user.nil?
      @output = {authenticated: false}
      render json: output
    else
      @output = {authenticated: true}
      login_user!(user)
      render json: output
    end
  end

  def destroy
    logout_user!
    @output = {authenticated: false}
    render json: output
  end

  def new
    render :new
  end

  def new_guest_session
    guest_id = Random.rand(6) + 1
    user = User.find_by id: guest_id
    login_user!(user)

    redirect_to (root_url + "#/dashboard")
  end

end
