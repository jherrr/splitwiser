json.extract! event_split, :dollar_amt
json.username event_split.user.username
json.user_id event_split.user.id

json.event_amt event_split.event.dollar_amt
json.event_owner_id event_split.event.lender.id
json.event_owner_name event_split.event.lender.username
json.event_date event_split.event.event_date
json.event_description event_split.event.description
