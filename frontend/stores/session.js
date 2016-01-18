var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/session_constants');

var _session = {};

var resetSession = function( session ) {
  _session = $.extend({}, session);
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.SESSION_RECEIVED:
      resetSession(payload.session);
      SessionStore.__emitChange();
      break;
  }
}

module.exports = SessionStore;
