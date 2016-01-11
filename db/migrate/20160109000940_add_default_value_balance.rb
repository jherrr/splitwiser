class AddDefaultValueBalance < ActiveRecord::Migration
  def change
    change_column(:balances, :amt_user_is_owed, :integer, default: 0)
    change_column(:balances, :amt_user_is_paid_back, :integer, default: 0)
    change_column(:balances, :amt_user_owes, :integer, default: 0)
    change_column(:balances, :amt_user_paid_back, :integer, default: 0)

  end
end
