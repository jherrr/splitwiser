class UsersController < ApplicationController
  before_action :require_no_user!

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)

      @output = {
        authenticated: true,
        username: @user.username,
        id: @user.id
      }

      render json: @output
    else
      flash.now[:errors] = @user.errors.full_messages
      render json: {authenticated: false}
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :email)
  end
end
