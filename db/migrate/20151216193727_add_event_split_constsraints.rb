class AddEventSplitConstsraints < ActiveRecord::Migration
  def change
    change_column(:event_splits, :user_id, :integer, null: false)
    change_column(:event_splits, :dollar_amt, :integer, null: false)
  end
end
