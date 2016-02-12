json.transaction do
  json.transaction_id @transaction.id
  json.lender_id @transaction.lender_id
  json.borrower_id @transaction.borrower_id
  json.dollar_amt @transaction.dollar_amt
  json.event_date @transaction.event_date

  json.lender_name @transaction.lender.username
  json.borrower_name @transaction.borrower.username
end

json.balances @balances
