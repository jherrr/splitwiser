class BalancesRenameUserIdAddAssociateId < ActiveRecord::Migration
  def change
    rename_column :balances, :user_id, :current_user_id
    add_column(:balances, :associate_id, :integer, null: false)
  end
end
