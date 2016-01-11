class AddBalancesUniqueIndices < ActiveRecord::Migration
  def change
    add_index :balances, [:current_user_id, :associate_id], unique: true
  end
end
