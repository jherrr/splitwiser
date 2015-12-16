var Dispatcher = require('../dispatcher/dispatcher.js');
var TransactionConstants = require('../constants/transaction_constants.js');

var TransactionActions = {
  receiveAllTransactions: function (transactions) {
    Dispatcher.dispatch({
      actionType: TransactionConstants.TRANSACTIONS_RECEIVED,
      transactions: transactions
    })
  }
}

module.exports = TransactionActions;
