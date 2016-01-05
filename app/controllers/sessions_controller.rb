class SessionsController < ApplicationController
  before_action :require_no_user!, only: [:create, :new]

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      flash.now[:errors] = ["Incorrect username and/or password"]
      render :new
    else
      login_user!(user)
      puts "root_url: "
      puts root_url
      puts "hi"
      redirect_to (root_url + "#/dashboard")
    end
  end

  def destroy
    logout_user!
    redirect_to new_session_url
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
