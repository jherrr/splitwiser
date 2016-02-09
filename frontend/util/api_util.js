var UserActions = require('../actions/user_actions');
var BalanceActions = require('../actions/balance_actions');
var SessionActions = require('../actions/session_actions');
var IndexActions = require('../actions/index_actions');

ApiUtil = {

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
        //
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
    })
  },




  createNewEvent: function( data ) {
    $.ajax({
      url: "api/events/",
      method: "POST",
      data: data,
      success: function ( changedData ) {
        BalanceActions.receiveUpdatedBalances( changedData.balances );

        IndexActions.receiveNewEvent( changedData.event );
        /* I think I actually don't need the split action */
        // IndexActions.receiveNewSplits( changedData.event_splits );
      }
    })
  },
  fetchBalances: function ( current_user_id ) {
    $.ajax({
      url: "api/balances/" + current_user_id,
      success: function ( balance_data ) {
        BalanceActions.receiveBalances( balance_data );
      }
    })
  },
  createNewSession: function ( data, callback ) {
    $.ajax({
      url: "api/session/",
      method: "POST",
      data: data,
      success: function ( sessionData ) {
        if ( !sessionData.authenticated ) {
          window.notAuthenticated = true;
        } else {
          callback();
        }
        window.user_id = sessionData.id;
        window.username = sessionData.username;
        SessionActions.receiveSession( sessionData );
      }
    });
  },
  createGuestSession: function ( ) {
    $.ajax({
      url: "api/guest_session",
      method: "GET",
      success: function ( sessionData ) {
        window.user_id = sessionData.id;
        window.username = sessionData.username;
        SessionActions.receiveSession( sessionData );
      }
    });
  },
  destroySession: function () {
    $.ajax({
      url: "api/session",
      method: "DELETE",
      success: function ( sessionData ) {
        window.user_id = undefined;
        window.username = undefined;
      }
    })
  },
  fetchIndex: function ( user_id ) {
    $.ajax({
      url: "api/events/" + user_id,
      success: function (events) {
        IndexActions.receiveAllEvents(events);
      }
    });

    $.ajax({
      url: "api/event_splits/" + user_id,
      success: function (eventSplits) {

        IndexActions.receiveAllEventSplits(eventSplits);
      }
    });

    $.ajax({
      url: "api/transactions/" + user_id,
      success: function (transactions) {
        IndexActions.receiveAllTransactions(transactions);
      }
    });
  },
  createNewTransaction: function ( data ) {
    $.ajax({
      url: "api/transactions",
      method: "POST",
      data: data,
      success: function ( transactionData ) {
        debugger;
        BalanceActions.receiveUpdatedBalances( transactionData.balances );
        IndexActions.receiveNewTransaction( transactionData.transaction );
      }
    });
  },
  createNewUser: function ( data, callback ) {

    $.ajax({
      url: "users",
      method: "POST",
      data: data,
      success: function ( sessionData ) {
        if ( !sessionData.authenticated ) {
          window.notAuthenticated = true;
        } else {
          callback();
        }
        window.user_id = sessionData.id;
        window.username = sessionData.username;
        SessionActions.receiveSession( sessionData );
      }

    });
  }
};

module.exports = ApiUtil;
