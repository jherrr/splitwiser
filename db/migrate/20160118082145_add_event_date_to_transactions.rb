class AddEventDateToTransactions < ActiveRecord::Migration
  def change
    add_column(:transactions, :event_date, :date, null: false)
  end
end
