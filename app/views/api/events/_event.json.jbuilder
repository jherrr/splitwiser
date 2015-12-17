json.extract! event, :item, :description, :dollar_amt, :created_at, :settled
json.lender do
  json.username event.lender.username
  json.id event.lender.id
end
