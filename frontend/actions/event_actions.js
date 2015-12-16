var Dispatcher = require('../dispatcher/dispatcher.js');
var EventConstants = require('../constants/event_constants.js');

var EventActions = {
  receiveAllEvents: function (events) {
    Dispatcher.dispatch({
      actionType: EventConstants.EVENTS_RECEIVED,
      transactions: events
    })
  }
}

module.exports = EventActions;
