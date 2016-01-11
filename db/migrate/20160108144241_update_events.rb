class UpdateEvents < ActiveRecord::Migration
  def change
    add_column(:events, :event_date, :date, null: false)

    create_table :balances do |t|
      t.integer :user_id, null: false
      t.integer :amt_user_is_owed, null: false
      t.integer :amt_user_is_paid_back, null: false
      t.integer :amt_user_owes, null: false
      t.integer :amt_user_paid_back, null: false
      t.timestamps null: false
    end

  end
end
