class EventSplit < ActiveRecord::Base
  validates :user_id, :dollar_amt, :event_id, presence: true

  has_one :lender,
    through: :event,
    source: :lender

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "User"

  belongs_to :event,
    primary_key: :id,
    foreign_key: :event_id,
    class_name: "Event"

end
