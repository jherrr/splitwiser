var React = require('react');
var UserStore = require('../stores/user.js');
var ApiUtil = require('../util/api_util.js');

var UserIndexItem = require('./dashboard_user_index_item.jsx');

var UserIndex = React.createClass({
  _onChange: function () {
    this.setState({owedAmts: UserStore.owedAmounts(), lendedAmts: UserStore.lendedAmounts(),
                  users: UserStore.users()});
  },
  getInitialState: function () {
    return {users: [] , owedAmts: {}, lendedAmts: {}};
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    ApiUtil.fetchUsers();
    ApiUtil.fetchUserLendedAmounts(window.user_id);
    ApiUtil.fetchUserOwedAmounts(window.user_id);
  },
  compomentWillUnmount: function () {
    this.userListener.remove();
  },
  render: function () {
    var listItems = [];

    this.state.users.forEach( function (user)  {
      var owed = this.state.owedAmts[user.id];
      var lend = this.state.lendedAmts[user.id];

      if ( !owed ) {
        owed = 0;
      }
      if ( !lend ) {
        lend = 0;
      }

      if ((owed - lend) !== 0) {
        listItems.push( <UserIndexItem key={user.id} owed={owed} lend={lend} user={user}/> );
      }
    }.bind(this));

    return(
      <ul id="dashboard-user-index">
        { listItems }
      </ul>
    );
  }
});

module.exports = UserIndex;
