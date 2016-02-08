var React = require('react');

TransactionItem = React.createClass({
  formatDollar: function(dollar_amt) {
    return (dollar_amt/100).toFixed(2);
  },
  render: function() {
    var transaction = this.props.transaction;
    var dollar_amt = transaction.dollar_amt;
    var borrower = transaction.borrower_name;
    var lender = transaction.lender_name;
    var date = transaction.event_date;

    var output = "";

    if ( transaction.lender_id === window.user_id ) {
      output = borrower + " paid you $" + this.formatDollar( dollar_amt ) + " on " + date + ".";
    }
    else if ( transaction.borrower_id === window.user_id ) {
      output = "You paid " + lender + " $" + this.formatDollar( dollar_amt ) + " on " + date + ".";
    }

    return (
      <li className="event-index-item event-item">
          { output }
      </li>
    );
  }
});

module.exports = TransactionItem;
