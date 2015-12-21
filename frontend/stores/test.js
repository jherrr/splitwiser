var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _current_user = {};

var CurrentUserStore = new Store(AppDispatcher);
var CurrentUserConstants = require('../constants/current_user_constants');

CurrentUserStore.all = function () {
  return _current_user.slice(0);
};

var resetCurrentUser = function(current_user) {
  _current_user = current_user;
};

var resetCurrentUserAttribute = function(attributeValue) {
  _current_user[attributeValue.attribute] = attributeValue.value;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case CurrentUserConstants.CURRENT_USER_RECEIVED:
      resetCurrentUser(payload.current_user);
      CurrentUserStore.__emitChange();
      break;
    case CurrentUserConstants.CURRENT_USER_ATTRIBUTE_RECEIVED:
      resetCurrentUserAttribute(payload.attributeValue);
      CurrentUserStore.__emitChange();
      break;
    case CurrentUserConstants.CURRENT_USER_OWED_AMOUNT_RECEIVED:
      resetCurrentUserAttributes(payload.attributeValue);
      break;
  }
}

module.exports = CurrentUserStore;
