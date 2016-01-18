var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserStore = new Store(AppDispatcher);
var UserConstants = require('../constants/user_constants');

var _users = [];
var _lendedAmounts = {};
var _owedAmounts = {};

UserStore.users = function () {
  return _users.slice(0);
};

UserStore.lendedAmounts = function() {
  return $.extend({}, _lendedAmounts);
};

UserStore.owedAmounts = function() {
  return $.extend({}, _owedAmounts);
};

var resetUsers = function(users) {
  _users = users.slice(0);
};

var resetLendedAmounts = function(lendedAmountData) {
  _lendedAmounts = $.extend({}, lendedAmountData)
};

var resetOwedAmounts = function(owedAmountData) {
  _owedAmounts = $.extend({}, owedAmountData);
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.USERS_RECEIVED:
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    case UserConstants.LENDED_AMOUNT_DATA_RECEIVED:
      resetLendedAmounts(payload.lendedAmountData);
      UserStore.__emitChange();
      break;
    case UserConstants.OWED_AMOUNT_DATA_RECEIVED:

      resetOwedAmounts(payload.owedAmountData);
      UserStore.__emitChange();
      break;
  }
}

module.exports = UserStore;
