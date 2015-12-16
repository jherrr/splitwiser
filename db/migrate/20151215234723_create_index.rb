class CreateIndex < ActiveRecord::Migration
  def change
    add_index(:events, :lender_id)
  end
end
