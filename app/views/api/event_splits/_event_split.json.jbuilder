json.extract! event_split, :dollar_amt
json.user do
  json.username event_split.user.username
  json.id event_split.user.id
end

json.event do
  json.extract! event_split.event :dollar_amt
  json.event_owner event_split.event.lender.id
end
