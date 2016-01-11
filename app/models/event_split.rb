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

  def add_splits(event_id, splits)
    splits.each do |split|
      addSplit(event_id, split)
    end
  end

  def addSplit(event_id, split_data)
    balance = Balance.find_by user_id: split_data[:user_id]

    if balance
      balance.amt_user_is_owed += event_data.dollar_amt
      balance.save!
    else
      Balance.create!(amt_user_owes: event_data.amt_user_owes)
    end

    split_data[:event_id] = event_id

    

    EventSplit.create!(split_data)
  end

end
