class Transaction < ActiveRecord::Base
  validates :lender_id, :borrower_id, :dollar_amt, presence: true
  belongs_to :lender,
      foreign_key: :lender_id,
      primary_key: :id,
      class_name: "User"

  belongs_to :borrower,
      foreign_key: :borrower_id,
      primary_key: :id,
      class_name: "User"

end
