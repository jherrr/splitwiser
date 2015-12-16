var React = require('react');

var EventStore = require('../stores/event');
var TransactionStore = require('../stores/transaction');
var ApiUtil = require('../util/api_util');
var EventItemIndex = require('./event_index_item');

function _getAllTransactions() {
  return TransactionStore.all();
}

function _getAllEvents() {
  return EventStore.all();
}

function _mergeTransactionsEvents() {
  var transactions = _getAllTransactions();
  var events = _getAllEvents();
  var mergedOutput = [];

  while( transactions.length > 0 && events.length > 0 ) {
    var transaction = transactions.shift();
    var _event = events.shift();
    var transactionDate = new Date(transaction);
    var eventDate = new Date(_event);

    if ( transactionDate.getTime() >= eventDate.getTime() ) {
      transaction.objType = "transaction";
      mergedOutput.push(transaction);
    } else if (transactionDate.getTime < eventDate.getTime() ) {
      _event.objType = "event";
      mregedOutput.push(_event);
    }
  }

  mergedOutput = mergedOutput.concat(transactions).concat(events);
  return mergedOutput;
}

var TransactionIndex = React.createClass({
  _transactionsChanged: function() {
    this.setState({transactions: _mergeTransactionsEvents()});
  },
  _eventsChanged: function() {
    this.setState({transactions: _mergeTransactionsEvents()});
  },
  getInitialState: function() {
    return {listItems: _mergeTransactionsEvents()};
  },
  componentDidMount: function() {
    this.transactionListener = TransactionStore.addListener(this._transactionsChanged);
    this.eventListener = EventStore.addListener(this._eventsChanged)
    ApiUtil.fetchTransactions();
    ApiUtil.fetchEvents();
  },
  componentWillUnmount: function() {
    this.transactionListener.remove();
    this.eventListener.remove();
  },
  render: function() {
    var listItems = this.state.listItems.map(function (listItem, idx) {
      if (listItem.objType === "event") {
        return <EventItemIndex key={idx} _event={listItem} />;
      }
    });
    return(
      <div id="transIndex">
        {listItems}
      </div>
    );
  }
});

module.exports = TransactionIndex;
