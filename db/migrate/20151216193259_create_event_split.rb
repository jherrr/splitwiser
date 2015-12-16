class CreateEventSplit < ActiveRecord::Migration
  def change
    create_table :event_splits do |t|
      t.integer :user_id
      t.integer :dollar_amt
      t.timestamps null: false
    end

    add_index :event_splits, :user_id
    add_column :events, :split_type, :string
  end
end
