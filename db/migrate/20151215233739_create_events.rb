class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :lender_id, null: false
      t.string :item, null: false
      t.text :description, null: false
      t.integer :dollar_amt, null: false
      t.boolean :settled, default: false

      t.timestamps null: false
    end
  end
end
