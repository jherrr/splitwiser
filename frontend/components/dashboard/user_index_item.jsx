var React = require('react');
var History = require('react-router').History;

UserIndexListItem = React.createClass({
  mixins: [History],
  showDetail: function () {
    this.history.pushState(null, '/user/' + this.props.user.id, {});
  },
  render: function () {
    var userOwed = this.props.lend;
    var userOwes = this.props.owed;

    var balance = userOwed - userOwes
    var output = "";
    var username = this.props.user.username;

    if ( balance > 0 ) {
      output = "You owe " + username + " $" + (Math.abs((balance/parseFloat(100)))).toFixed(2);
    } else if ( balance < 0 ) {
      output = username + " owes you $" + (Math.abs((balance/parseFloat(100)))).toFixed(2);
    }

    return(
      <div className="row">
        <li onClick={this.showDetail} className="col-md-4 col-sm-4 content">
          <p> {output} </p>
        </li>
      </div>
    );
  }
});

module.exports = UserIndexListItem;
