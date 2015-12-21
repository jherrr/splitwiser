var Dispatcher = require('../dispatcher/dispatcher.js');
var CurrentUserConstants = require('../constants/current_user_constants.js');

var CurrentUserActions = {
  receiveOwedAmount: function (owedAmount) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.CURRENT_USER_OWED_AMOUNT_RECEIVED,
      owedAmount: owedAmount
    });
  },
  receiveLendedAmount: function (lendedAmount) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.CURRENT_USER_LENDED_AMOUNT_RECEIVED,
      lendedAmount: lendedAmount
    });
  }
};

module.exports = CurrentUserActions;
