class AddColumnsEventSplits < ActiveRecord::Migration
  def change
    add_column(:event_splits, :amt_settled, :integer, null: false, default: 0)
    add_column(:event_splits, :settled, :boolean, null: false, default: false)
  end
end
