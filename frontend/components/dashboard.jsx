var React = require('react');

var EventStore = require('../stores/event');
var TransactionStore = require('../stores/transaction');
var EventSplitStore = require('../stores/event_split');
var UserStore = require('../stores/user');
var ApiUtil = require('../util/api_util');

var BalanceBook = require('./balance_book');
var UserIndex = require('./dashboard_user_index');
var AddABill = require('./add_a_bill');

var DashBoard = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div>
        <AddABill />
        <BalanceBook user_id={window.user_id} />
        <UserIndex />
      </div>
    );
  }

});

module.exports = DashBoard;
