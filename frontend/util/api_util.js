var TransactionActions = require('../actions/transaction_actions');
var EventActions = require('../actions/event_actions');
var EventSplitActions = require('../actions/event_split_actions');

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
  },
  fetchEventSplits: function(event_id) {
    $.ajax({
      url: "api/event_splits",
      data: {event_id: event_id},
      success: function (eventSplits) {
        EventSplitActions.receiveAllEventSplits(eventSplits);
      }
    })
  },
  fetchUserSplits: function(user_id) {
    $.ajax({
      url: "api/event_splits/" + user_id,
      success: function (userSplits) {
        EventSplitActions.receiveAllUserSplits(userSplits);
      }
    })
  }
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
