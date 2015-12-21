var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _events = [];
var EventStore = new Store(AppDispatcher);
var EventConstants = require('../constants/event_constants');

EventStore.all = function () {
  return _events.map( function(_event) {
    _event.objType = "event"
    return _event;
  });
  // return _events.slice(0);
};

var resetEvents = function(events) {
  _events = events.slice(0);
}

EventStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case EventConstants.EVENTS_RECEIVED:
      resetEvents(payload.events);
      EventStore.__emitChange();
      break;
  }
}



module.exports = EventStore;
