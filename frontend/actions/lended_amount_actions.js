var Dispatcher = require('../dispatcher/dispatcher.js');
var LendedAmountConstants = require('../constants/lended_amount_constants.js');

var LendedAmountActions = {
  receiveAllLendedAmounts: function (lendedAmounts) {
    Dispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    })
  }
}

module.exports = LendedAmountActions;
