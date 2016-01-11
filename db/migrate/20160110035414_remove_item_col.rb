class RemoveItemCol < ActiveRecord::Migration
  def change
    remove_column(:events, :item)
  end
end
