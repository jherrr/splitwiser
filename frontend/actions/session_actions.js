var Dispatcher = require('../dispatcher/dispatcher.js');
var SessionConstants = require('../constants/session_constants.js');

var SessionActions = {
  receiveSession: function ( sessionData ) {
    Dispatcher.dispatch({
      actionType: SessionConstants.SESSION_RECEIVED,
      session: sessionData
    });
  },
};

module.exports = SessionActions;
