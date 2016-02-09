var React = require('react');

var UserStore = require('../stores/user');
var BalanceStore = require('../stores/balance');

var ApiUtil = require('../util/api_util');

var BalanceBook = React.createClass({
  _currentUserChanged: function( ) {
    this.setState(CurrentUserStore.all());
  },
  _balancesChanged: function ( ) {
    this.setState({balances: BalanceStore.all()});
  },
  ___formatMoneyDisplay: function ( money ) {
    return (money/parseFloat(100)).toFixed(2);
  },
  getInitialState: function () {
    return {balances: {}};
  },
  componentDidMount: function () {
    this.balanceListener = BalanceStore.addListener(this._balancesChanged);
    ApiUtil.fetchBalances(window.user_id)
  },
  componentWillUnmount: function() {
    this.balanceListener.remove();
  },
  render: function () {
    // var owed_amt = (this.state.owed_amount/parseFloat(100)).toFixed(2);
    // var lended_amt = (this.state.lended_amount/parseFloat(100)).toFixed(2);
    var balance = (lended_amt - owed_amt).toFixed(2);

    var userBalance = this.state.balances[window.user_id];
    var owed_amt = 0;
    var lended_amt = 0;

    if ( userBalance ) {
      lended_amt =  userBalance.amt_user_is_owed - userBalance.amt_user_is_paid_back;
      owed_amt = userBalance.amt_user_owes - userBalance.amt_user_paid_back;
    }

    balance = this.___formatMoneyDisplay(lended_amt-owed_amt);
    owed_amt = this.___formatMoneyDisplay(owed_amt);
    lended_amt = this.___formatMoneyDisplay(lended_amt);

    return (
      <div id="balance-book" className="col-xs-12 col-md-12">
        <div className="row">
          <div className="col-md-3 col-sm-3 balance-item">
            <p>
              Hi {window.username}!
            </p>
          </div>

          <div className="col-md-3 col-sm-3 balance-item balance-middle">
            <p>
              Balance:
              ${balance}
            </p>
          </div>
          <div className="col-md-3 col-sm-3 balance-item balance-middle">
            <p>
              Lended Amount:
              ${lended_amt}
            </p>
          </div>
          <div className="col-md-3 col-sm-3 balance-item">
            <p>
              Owed Amount:
              ${owed_amt}
            </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BalanceBook;
