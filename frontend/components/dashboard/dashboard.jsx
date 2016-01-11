var React = require('react');

var EventStore = require('../../stores/event');
var TransactionStore = require('../../stores/transaction');
var EventSplitStore = require('../../stores/event_split');
var UserStore = require('../../stores/user');
var ApiUtil = require('../../util/api_util');

var BalanceBook = require('../balance_book');
var AddABill = require('../add_a_bill/add_a_bill');

var UserIndex = require('./user_index');


var DashBoard = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    ApiUtil.fetchUsers();
    ApiUtil.fetchBalances(window.user_id);
  },
  render: function() {
    return (
      <div id="dashboard">
        <AddABill />
        <BalanceBook user_id={window.user_id} />
        <UserIndex />
      </div>
    );
  }

});

module.exports = DashBoard;
