var React = require('react');

var AddATransaction = require('./add_a_transaction');

TransactionModal = React.createClass({

  render: function () {

    return(
      <div id="AddATransactionModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header bill-modal-header">
              <button type="button" className="close bill-modal-close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title bill-modal-title">Record a Cash Transaction</h4>
            </div>


            <AddATransaction/>


          </div>

        </div>
      </div>
    );

  }
});

module.exports = TransactionModal;
