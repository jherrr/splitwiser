var Dispatcher = require('../dispatcher/dispatcher.js');
var EventSplitConstants = require('../constants/event_split_constants.js');

var EventSplitActions = {
  receiveAllEventSplits: function (eventSplits) {
    Dispatcher.dispatch({
      actionType: EventSplitConstants.EVENT_SPLITS_RECEIVED,
      eventSplits: eventSplits
    })
  },
  receiveAllUserSplits: function (userSplits) {
    Dispatcher.dispatch({
      actionType: EventSplitConstants.USER_SPLITS_RECEIVED,
      userSplits: userSplits
    })
  }
};

module.exports = EventSplitActions;
