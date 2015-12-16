var React = require('react');
var History = require('react-router').History;

TransactionIndexItem = React.createClass({
  mixins: [History],
  showDetail: function() {
    this.history.pushState(null, '/transaction/' + this.props.transaction.id, {});
  },
  render: function() {
    var transaction = this.props.transaction;
    return (
      <li className="transaction-index-item" onClick={this.showDetail>
        <p>{transaction.borrower}</p>
        <p>{transaction.lender}</p>
        <p>${(transaction.dollar_amt)/100}</p>
      </li>
    );
  }
});

module.exports = TransactionIndexItem;
