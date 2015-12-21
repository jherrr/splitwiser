var Dispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/user_constants.js');

var UserActions = {
  receiveAllUsers: function (users) {
    Dispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },
  receiveLendedAmounts: function(lendedAmountData) {
    Dispatcher.dispatch({
      actionType: UserConstants.LENDED_AMOUNT_DATA_RECEIVED,
      lendedAmountData: lendedAmountData
    });
  },
  receiveOwedAmounts: function(owedAmountData) {
    Dispatcher.dispatch({
      actionType: UserConstants.OWED_AMOUNT_DATA_RECEIVED,
      owedAmountData: owedAmountData
    });
  }
}

module.exports = UserActions;
