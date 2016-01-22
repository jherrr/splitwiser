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
    var username = (<strong>{this.props.user.username}</strong>);
    var amount = (Math.abs((balance/parseFloat(100)))).toFixed(2).toString();
    if ( balance > 0 ) {
      output = (<p>
        You owe {username} <span className="negative-amt">${amount}</span>
      </p>)
    } else if ( balance < 0 ) {
      output = (<p>
        {username} owes you <span className="positive-amt">${amount}</span>
      </p>)
    }

    return(
        <li onClick={this.showDetail} className="col-md-12 content">
          {output}
        </li>
    );
  }
});

module.exports = UserIndexListItem;
