var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _transactions = [];
var TransactionStore = new Store(AppDispatcher);
var TransactionConstants = ('../constants/transaction_constants');

TransactionStore.all = function () {
  return _transactions.slice(0);
};

var resetTransactions = function(transactions) {
  _transactions = transactions.slice(0);
}

TransactionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TransactionConstants.TRANSACTIONS_RECEIVED:
      resetTransactions(payload.transactions);
      TransactionStore.__emitChange();
      break;
  }
}

window.TransactionStore = TransactionStore;

module.exports = TransactionStore;
