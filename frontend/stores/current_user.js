var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _current_user = {};

var CurrentUserStore = new Store(AppDispatcher);
var CurrentUserConstants = require('../constants/current_user_constants');

CurrentUserStore.all = function () {
  return $.extend({}, _current_user);
};

var resetCurrentUser = function(current_user) {
  _current_user = current_user;
};

var resetCurrentUserAttribute = function(attributeValue) {
  var attributes = Object.keys(attributeValue);

  attributes.forEach( function( attribute ) {
    _current_user[attribute] = attributeValue[attribute];
  });

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
      resetCurrentUserAttribute(payload.owedAmount);
      CurrentUserStore.__emitChange();
      break;
    case CurrentUserConstants.CURRENT_USER_LENDED_AMOUNT_RECEIVED:
      resetCurrentUserAttribute(payload.lendedAmount);
      CurrentUserStore.__emitChange();
      break;
  }
}

module.exports = CurrentUserStore;
