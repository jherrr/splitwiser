class AddColumnEventSplits < ActiveRecord::Migration
  def change
    add_column(:event_splits, :event_id, :integer, null: false)
  end
end
