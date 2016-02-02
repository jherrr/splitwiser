var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var UserStore = require('../../stores/user.js');
var BalanceStore = require('../../stores/balance.js');

var ApiUtil = require('../../util/api_util.js');

var UserIndexItem = require('./user_index_item.jsx');

var UserIndex = React.createClass({
  _onUserChange: function () {
    this.setState({users: UserStore.users()});
  },
  _onBalanceChange: function () {
    this.setState({balances: BalanceStore.all()});
  },
  getInitialState: function () {
    return {users: [], balances: {}};
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onUserChange);
    this.balanceListener = BalanceStore.addListener(this._onBalanceChange);
  },
  compomentWillUnmount: function () {
    this.userListener.remove();
    this.balanceListener.remove();
  },
  render: function () {
    var listItems = [];

    this.state.users.forEach( function (user)  {
      var balance = this.state.balances[user.id];
      var owes = 0;
      var lend = 0;

      if ( balance ) {
        owes = balance.amt_user_owes - balance.amt_user_paid_back
        lend = balance.amt_user_is_owed - balance.amt_user_is_paid_back
      }

      if ( ((owes - lend) !== 0) && user.id != window.user_id ) {
        listItems.push( <UserIndexItem key={user.id} owed={owes} lend={lend} user={user}/> );
      }
    }.bind(this));

    return(
        <div className="index-container col-md-12 col-xs-12">
          <div className="row user-panel">
            <div className="user-index-header">
                <strong>
                  Friends
                </strong>
            </div>
            <ul className="list-group">
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                { listItems }
              </ReactCSSTransitionGroup>
            </ul>
          </div>
        </div>
    );
  }
});

module.exports = UserIndex;
