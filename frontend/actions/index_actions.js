var Dispatcher = require('../dispatcher/dispatcher.js');
var IndexConstants = require('../constants/index_constants.js');

var IndexActions = {
  receiveAllEvents: function (events) {
    Dispatcher.dispatch({
      actionType: IndexConstants.EVENTS_RECEIVED,
      events: events
    });
  },
  receiveAllEventSplits: function (eventSplits) {
      Dispatcher.dispatch({
        actionType: IndexConstants.EVENT_SPLITS_RECEIVED,
        eventSplits: eventSplits
    });
  }
};

module.exports = IndexActions;
