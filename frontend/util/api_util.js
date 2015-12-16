var TransactionActions = require('../actions/transaction_actions');
var EventActions = require('../actions/event_actions');

ApiUtil = {
  fetchTransactions: function() {
    $.ajax({
      url: "api/transactions",
      success: function (transactions) {
        TransactionActions.receiveAllTransactions(transactions);
      }
    })
  },
  fetchEvents: function() {
    $.ajax({
      url: "api/events",
      success: function (events) {
        EventActions.receiveAllEvents(events);
      }
    })
  }
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
