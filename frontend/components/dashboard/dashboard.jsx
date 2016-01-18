var React = require('react');

var EventStore = require('../../stores/event');
var TransactionStore = require('../../stores/transaction');
var EventSplitStore = require('../../stores/event_split');
var UserStore = require('../../stores/user');
var ApiUtil = require('../../util/api_util');

var NavBar = require('../navbar/navbar');
var BalanceBook = require('../balance_book');
var AddABill = require('../add_a_bill/add_a_bill');
var AddATransaction = require('../add_a_transaction/add_a_transaction');

var UserIndex = require('./user_index');
var EventIndex = require('../event_index/event_index');

var DashBoard = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    ApiUtil.fetchUsers();
    ApiUtil.fetchBalances(window.user_id);
    ApiUtil.fetchIndex(window.user_id);
  },
  render: function() {
    return (
      <div id="dashboard">
        <NavBar />
        <AddABill />
        <AddATransaction />
        <BalanceBook user_id={window.user_id} />
        <UserIndex />
        <EventIndex />
      </div>
    );
  }

});

module.exports = DashBoard;
