var React = require('react');

var TransactionIndex = require('./transaction_index');

var EventStore = require('../stores/event');
var TransactionStore = require('../stores/transaction');
var EventSplitStore = require('../stores/event_split');

var App = React.createClass({
  render: function(){
    return (
      <div id="app">
        <header><h1>SplitWiser</h1></header>
        <TransactionIndex />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
