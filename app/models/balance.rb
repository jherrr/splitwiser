class Balance < ActiveRecord::Base
  validates :amt_user_is_owed, :amt_user_is_paid_back, :amt_user_owes, :amt_user_paid_back,
    null: false

  validates_uniqueness_of :current_user_id, :scope => :associate_id

end
