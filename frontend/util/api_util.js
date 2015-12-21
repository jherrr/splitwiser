var TransactionActions = require('../actions/transaction_actions');
var EventActions = require('../actions/event_actions');
var EventSplitActions = require('../actions/event_split_actions');
var UserActions = require('../actions/user_actions');
var LendedAmountActions = require('../actions/lended_amount_actions');
var CurrentUserActions = require('../actions/current_user_actions');

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
  },
  fetchUsers: function() {
    $.ajax({
      url: "api/user_data",
      success: function (users) {
        UserActions.receiveAllUsers(users);
      }
    });
  },
  fetchLendedAmounts: function() {
    $.ajax({
      url: "api/lended_amounts",
      success: function (lendedAmounts) {
        LendedAmountActions.receiveAllLendedAmounts(lendedAmounts);
      }
    })
  },
  fetchCurrentUserOwedAmount: function(user_id) {
    $.ajax({
      url: "api/owed_amount/" + user_id,
      success: function (owedAmount) {
        CurrentUserActions.receiveOwedAmount(owedAmount);
      }
    });
  },
  fetchCurrentUserLendedAmount: function(user_id) {
    $.ajax({
      url: "api/lended_amount/" + user_id,
      success: function (lendedAmount) {
        CurrentUserActions.receiveLendedAmount(lendedAmount)
      }
    });
  },
  fetchUserLendedAmounts: function(user_id) {
    $.ajax({
      url: "api/lended_amount_user/" + user_id,
      success: function (lendedAmountData) {
        UserActions.receiveLendedAmounts( lendedAmountData );
      }
    });
  },
  fetchUserOwedAmounts: function(user_id) {
    $.ajax({
      url: "api/owed_amount_user/" +user_id,
      success: function (owedAmountData) {
        UserActions.receiveOwedAmounts( owedAmountData );
      }
    });
  }
};



module.exports = ApiUtil;
