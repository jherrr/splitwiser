class Event < ActiveRecord::Base
  validates :lender_id, :item, :description, :dollar_amt, presence: true

  belongs_to(
    :lender,
    foreign_key: :lender_id,
    primary_key: :id,
    class_name: "User")
end
