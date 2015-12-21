var React = require('react');
var History = require('react-router').History;

UserIndexListItem = React.createClass({
  mixins: [History],
  showDetail: function () {
    this.history.pushState(null, '/user/' + this.props.user.id, {});
  },
  render: function () {
    var userOwes = this.props.lend;
    var userOwed = this.props.owed;

    var balance = userOwed - userOwes
    var output = "";

    if ( balance > 0 ) {
      output = "you owe $" + (Math.abs((balance/parseFloat(100)))).toFixed(2);
    } else if ( balance < 0 ) {
      output = "owes you $" + (Math.abs((balance/parseFloat(100)))).toFixed(2);
    }

    return(
      <li onClick={this.showDetail} className="user-list-item">
        <p>{this.props.user.username}</p>
        <p>{output}</p>
      </li>
    );
  }
});

module.exports = UserIndexListItem;
