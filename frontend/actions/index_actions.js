var Dispatcher = require('../dispatcher/index_dispatcher.js');
var IndexConstants = require('../constants/index_constants.js');

var IndexActions = {
  receiveAllEvents: function (events) {
    Dispatcher.dispatch({
      actionType: IndexConstants.EVENTS_RECEIVED,
      events: events
    });
  },
  receiveAllEventSplits: function (eventSplits) {
      Dispatcher.dispatch({
        actionType: IndexConstants.EVENT_SPLITS_RECEIVED,
        eventSplits: eventSplits
    });
  },
  receiveAllTransactions: function (transactions) {
      Dispatcher.dispatch({
        actionType: IndexConstants.TRANSACTIONS_RECEIVED,
        transactions: transactions
      });
  },
  receiveNewEvent: function (_event) {
    Dispatcher.dispatch({
      actionType: IndexConstants.NEW_EVENT_RECEIVED,
      _event: _event
    });
  },
  // receiveNewSplits: function (splits) {
  //   Dispatcher.dispatch({
  //     actionType: IndexConstants.NEW_SPLITS_RECEIVED,
  //     splits: splits
  //   });
  // },
  receiveNewTransaction: function (transaction) {
    Dispatcher.dispatch({
      actionType: IndexConstants.NEW_TRANSACTION_RECEIVED,
      transaction: transaction
    })
  },
  addUserTransactions: function (transactions) {
    Dispatcher.dispatch({
      actionType: IndexConstants.USER_TRANSACTIONS_RECEIVED,
      transactions: transactions
    });
  },
  addUserSplits: function (splits) {
    Dispatcher.dispatch({
      actionType: IndexConstants.USER_SPLITS_RECEIVED,
      splits: splits
    });
  },
  resetUserIndex: function (splits) {
    Dispatcher.dispatch({
      actionType: IndexConstants.RESET_USER_INDEX
    });
  }
};

module.exports = IndexActions;
