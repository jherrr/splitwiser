var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var EventSplitStore = new Store(AppDispatcher);
var EventSplitConstants = require('../constants/event_split_constants');

var _eventSplits = [];
var _userSplits = [];

EventSplitStore.userAll = function () {
  return _userSplits.slice(0);
};

EventSplitStore.all = function () {
  return _eventSplits.slice(0);
};

var resetEventSplits = function(eventSplits) {
  _eventSplits = eventSplits.slice(0);
}

var resetUserSplits = function(userSplits) {
  _userSplits = userSplits.slice(0);
}

EventSplitStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case EventSplitConstants.EVENT_SPLITS_RECEIVED:
      resetEventSplits(payload.eventSplits);
      EventSplitStore.__emitChange();
      break;
    case EventSplitConstants.USER_SPLITS_RECEIVED:
      resetUserSplits(payload.userSplits);
      EventSplitStore.__emitChange();
      break;
  }
}

window.EventSplitStore = EventSplitStore;

module.exports = EventSplitStore;
