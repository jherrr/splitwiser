var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var IndexStore = new Store(AppDispatcher);
var IndexConstants = require('../constants/index_constants');

_events = [];
_splits = [];

IndexStore.all = function () {
  var output = _merge(_events, _splits);

  return output;
};

var resetEvents = function(events) {
  _events = [];
  events.forEach( function ( _event ) {
    _event['objType'] = 'event';
    _events.push(_event);
  });
};

var resetSplits = function(splits) {
  _splits = [];

  splits.forEach( function ( split ) {
    split['objType'] = 'split';
    _splits.push(split);
  });

  _splits.sort( function( a, b ) {
    return new Date(b.event_date).getTime()
      - new Date(a.event_date).getTime();
  });
};

var _merge = function (arr1, arr2) {
  var idx1 = 0;
  var idx2 = 0;
  var output = [];

  while ( idx1 < arr1.length && idx2 < arr2.length ) {
    var comparator = new Date(arr1[idx1].event_date).getTime()
      - new Date(arr2[idx2].event_date).getTime();

    if ( comparator < 0 ) {
      output.push( arr2[idx2] );
      idx2 += 1;
    } else if (comparator === 0 ) {
      output.push( arr1[idx1] );
      idx1 += 1;
    } else if (comparator > 0 ) {
      output.push( arr1[idx1] );
      idx1 += 1;
    }
  }

  output = output.concat(arr1.slice(idx1)).concat(arr2.slice(idx2));
  return output;
};

IndexStore.__onDispatch = function (payload) {
  
  switch(payload.actionType) {
    case IndexConstants.EVENTS_RECEIVED:
      resetEvents(payload.events);
      IndexStore.__emitChange();
      break;
    case IndexConstants.EVENT_SPLITS_RECEIVED:
      resetSplits(payload.eventSplits);
      IndexStore.__emitChange();
      break;
  }
}



module.exports = IndexStore;
