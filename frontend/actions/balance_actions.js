var Dispatcher = require('../dispatcher/balance_dispatcher.js');
var BalanceConstants = require('../constants/balance_constants.js');

var BalanceActions = {
  receiveBalances: function ( balance_data ) {
    Dispatcher.dispatch({
      actionType: BalanceConstants.BALANCES_RECEIVED,
      balances: balance_data.balances
    });
  }
};

module.exports = BalanceActions;
