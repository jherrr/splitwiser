json.event @event, :id, :lender_id, :description, :dollar_amt, :split_type, :event_date

split_output = {}
@event_splits.each do |split|
  split_output[split.user_id] = {
    id: split.id, dollar_amt: split.dollar_amt, event_id: split.event_id}
end

json.event_splits split_output

balance_output = {}
@balances.each do |associate_id, balance|
  balance_output[associate_id] = {
    id: balance.id,
    current_user_id: balance.current_user_id,
    amt_user_is_owed: balance.amt_user_is_owed,
    amt_user_is_paid_back: balance.amt_user_is_paid_back,
    amt_user_owes: balance.amt_user_owes,
    amt_user_paid_back: balance.amt_user_paid_back,
  }
end

json.balances balance_output
