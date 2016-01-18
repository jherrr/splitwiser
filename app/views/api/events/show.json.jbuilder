json.array! @events do |event|
  json.description event.description
  json.dollar_amt event.dollar_amt
  json.event_date event.event_date
  json.event_id event.id
  json.lender_id event.lender_id
  json.lender_username event.lender.username
  json.split_type event.split_type
end
