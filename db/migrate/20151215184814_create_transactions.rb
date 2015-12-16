class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :lender_id, null: false
      t.integer :borrower_id, null: false
      t.integer :dollar_amt, null: false
      t.timestamps null: false
    end

    add_index(:transactions, :lender_id)
    add_index(:transactions, :borrower_id)
  end
end
