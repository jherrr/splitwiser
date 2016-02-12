var Store = require('flux/utils').Store;
var IndexDispatcher = require('../dispatcher/index_dispatcher');

var IndexStore = new Store(IndexDispatcher);
var IndexConstants = require('../constants/index_constants');

_events = [];
_splits = [];
_transactions = [];

_userSplits = [];
_userTransactions = [];

resetUserIndex = function () {
  _userSplits = [];
  _userTransactions = [];
};

addUserTransactions = function (transactions) {
  transactions.forEach( function(transaction) {
    transaction["objType"] = "transaction";
    _userTransactions.push(transaction);
  })
};

addUserSplits = function (splits) {
  splits.forEach( function ( split ) {
    split['objType'] = 'split';

    if ( !(split.event_owner_id === window.user_id && split.user_id === window.user_id) ) {
      _userSplits.push(split);
    }
  });
};

IndexStore.userAll = function () {
  
  var output = _userSplits.concat(_userTransactions).sort( function( a, b ) {
    return new Date(b.event_date).getTime()
      - new Date(a.event_date).getTime();
  });

  return output;
};

IndexStore.all = function () {

  var output = _merge(_events, _splits);
  output = _merge(output, _transactions);

  return output;
};

var resetEvents = function(events) {
  _events = [];
  events.forEach( function ( _event ) {
    _event['objType'] = 'event';
    _events.push(_event);
  });
};

var resetTransactions = function(transactions) {
  _transactions = [];
  transactions.forEach( function ( transaction ) {
    transaction['objType'] = 'transaction';
    _transactions.push(transaction);
  });
};

var resetSplits = function(splits) {
  _splits = [];

  splits.forEach( function ( split ) {
    split['objType'] = 'split';

    if ( !(split.event_owner_id === window.user_id && split.user_id === window.user_id) ) {
      _splits.push(split);
    }

  });

  _splits.sort( function( a, b ) {
    return new Date(b.event_date).getTime()
      - new Date(a.event_date).getTime();
  });
};

var addNewEvent = function(_event) {
  var newDate = _event.event_date;
  _event.objType = "event";
  _event['new'] = true;

  var idx = 0;
  while ( compareDates(_events[idx].event_date, newDate) > 0 ) {
    idx+=1;
  }

  _events.splice(idx, 0, _event);
};

/*  I think I actually don't need to add the splits of the new event */
// var addNewSplits = function(splits) {
//
//   var newDate = splits[0].event_date;
//   var idx = 0;
//   while ( compareDates(_splits[idx].event_date, newDate) > 0 ) {
//     idx+=1;
//   }
//
//   splits.forEach( function(split) {
//     split.splice(idx, 0, split);
//   });
// };

var addNewTransaction = function( transaction ) {
  var newDate = transaction.event_date;
  transaction.objType = "transaction";
  transaction['new'] = true;

  var idx = 0;
  while ( compareDates(_events[idx].event_date, newDate) > 0 ) {
    idx+=1;
  }

  _transactions.splice(idx, 0, transaction);
};

var compareDates = function( date1, date2 ) {
  return new Date(date1).getTime() - new Date(date2).getTime();
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
    case IndexConstants.TRANSACTIONS_RECEIVED:
      resetTransactions(payload.transactions);
      IndexStore.__emitChange();
      break;
    case IndexConstants.NEW_EVENT_RECEIVED:
      addNewEvent(payload._event);
      IndexStore.__emitChange();
      break;
    case IndexConstants.NEW_TRANSACTION_RECEIVED:
      addNewTransaction(payload.transaction);
      IndexStore.__emitChange();
      break;
    case IndexConstants.USER_TRANSACTIONS_RECEIVED:
      addUserTransactions(payload.transactions);
      IndexStore.__emitChange();
      break;
    case IndexConstants.USER_SPLITS_RECEIVED:
      addUserSplits(payload.splits);
      IndexStore.__emitChange();
      break;
    case IndexConstants.RESET_USER_INDEX:
      resetUserIndex();
      IndexStore.__emitChange();
      break;

    /* I actually don't think I need to add the splits of a new event*/
    // case IndexConstants.NEW_SPLITS_RECEIVED:
    //   addNewSplits(payload.splits);
    //   IndexStore.__emitChange();
    //   break;
  }
}

module.exports = IndexStore;
