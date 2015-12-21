var React = require('react');

var CurrentUserStore = require('../stores/current_user');
var UserStore = require('../stores/user');

var ApiUtil = require('../util/api_util');

var BalanceBook = React.createClass({
  _currentUserChanged: function( ) {
    this.setState(CurrentUserStore.all());
  },
  getInitialState: function () {
    return {balance: 0, lended_amount: 0, owed_amount: 0};
  },
  componentDidMount: function () {
    this.currentUserListener = CurrentUserStore.addListener(this._currentUserChanged);
    ApiUtil.fetchCurrentUserOwedAmount(window.user_id)
    ApiUtil.fetchCurrentUserLendedAmount(window.user_id)
  },
  componentWillUnmount: function() {
    this.splitListener.remove();
  },
  render: function () {
    var owed_amt = (this.state.owed_amount/parseFloat(100)).toFixed(2);
    var lended_amt = (this.state.lended_amount/parseFloat(100)).toFixed(2);
    var balance = (lended_amt - owed_amt).toFixed(2);

    return (
      <div id="balance-book">
        <div className="balance-book-item">
          Balance:
          ${balance}
        </div>
        <div className="balance-book-item">
          Lended Amount:
          ${lended_amt}
        </div>
        <div className="balance-book-item">
          Owed Amount:
          ${owed_amt}
        </div>
      </div>
    );
  }
});

module.exports = BalanceBook;
