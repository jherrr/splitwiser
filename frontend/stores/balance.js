var Store = require('flux/utils').Store;
var BalanceDispatcher = require('../dispatcher/balance_dispatcher');

var BalanceStore = new Store(BalanceDispatcher);
var BalanceConstants = require('../constants/balance_constants');

var _balances = {};

BalanceStore.all = function () {
  return $.extend({}, _balances);
};

var resetBalances = function(balances) {
  _balances = $.extend({}, balances);
};

var updateBalances = function(balances) {
  _balances = $.extend(_balances, balances);
}

BalanceStore.__onDispatch = function (payload) {
  debugger;
  switch(payload.actionType) {
    case BalanceConstants.BALANCES_RECEIVED:
      resetBalances(payload.balances);
      BalanceStore.__emitChange();
      break;
    case BalanceConstants.UPDATED_BALANCES_RECEIVED:
      updateBalances(payload.balances);
      BalanceStore.__emitChange();
      break;
  }
};

module.exports = BalanceStore;
