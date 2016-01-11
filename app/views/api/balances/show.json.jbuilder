balances_output = {}

@balances.each do |balance|
  balances_output[balance.associate_id] = balance
end

json.balances balances_output
