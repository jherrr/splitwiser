var React = require('react');

var ApiUtil = require('../../util/api_util');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ReceivePaymentAutoComplete = require('./receive_payment_auto_complete.jsx');
var DatePicker= require('../date_picker');

var ChoosePayer = require('../add_a_bill/choose_payer');

var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');

AddATransaction = React.createClass({
  mixins: [LinkedStateMixin],

  _toggleSubModal: function (e) {
    e.preventDefault();

    if ( this.state.subModalIsOpen ) {
      this.setState({subModalIsOpen: false});
    } else {
      this.setState({subModalIsOpen: true});
    }
  },
  _usersChanged: function () {
    this.setState({users: UserStore.users()});
  },
  _resetState: function () {
    blankAttrs = $.extend(this.attrs, {
      names: [],
      users: UserStore.users(),
      eventDate: this.state.eventDate
    });

    this.setState(blankAttrs);
  },
  _selectPerson: function ( user ) {
    this.setState({personToBePaid: user});
  },
  _handleDollarAmt: function (e) {
    this.setState({dollar_amt: e.target.value});
  },
  _formatDollarAmt: function (e) {
    var value = e.target.value;
    value = parseFloat(value).toFixed(2)

    this.setState({dollar_amt: value});
  },
  _handleDate: function(date) {
    this.setState({eventDate: date});
  },
  _handleSave: function(e) {

    e.preventDefault();

    var data = {};

    data["dollar_amt"] = this.state.dollar_amt * 100;
    data["personToBePaid"] = this.state.personToBePaid;
    data["payer"] = {id: window.user_id, username: window.username};
    data["event_date"] = this.state.eventDate;

    ApiUtil.createNewTransaction( data );

    this._resetState();
  },
  attrs: {
    dollar_amt: parseFloat(0).toFixed(2),
    modalIsOpen: false,
    subModalIsOpen: false,
    names: [],
    users: UserStore.users(),
    personToBePaid: {},
    eventDate: "",
  },
  getInitialState: function () {
    return this.attrs;
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._usersChanged);

    payer = {username: window.username, id: window.user_id};

    this.setState({
      payer: payer
    });
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  render: function () {
    var hiddenStyle = {};

    var modalClass = 'modal';
    if (this.state.modalIsOpen) {
      modalClass += ' is-active'
    }

    return(
      <div>
        <div className="modal-body">

            <ReceivePaymentAutoComplete users={this.state.users} autoCallback={this._selectPerson} />

            <form className='new-bill' onSubmit={this.createBill}>
              <div className="row">
                <div className="input-group col-sm-offset-1 col-md-offset-1 col-xs-offset-1
                  col-md-10 col-sm-10 col-xs-10">
                  <span className="input-group-addon" id="basic-addon5">
                    <span className="glyphicon glyphicon-usd" aria-hidden="true"></span>
                  </span>
                  <input type="text" className="form-control session-input"
                    placeholder="Dollar Amount"
                    aria-describedby="basic-addon1"
                    onChange={this._handleDollarAmt}
                    onBlur={this._formatDollarAmt}
                    value={this.state.dollar_amt}
                    />
                </div>
              </div>

              <DatePicker id='transaction-date-picker' dateCallback={this._handleDate}></DatePicker>
            </form>

        </div>

        <div className="modal-footer">
          <button className="btn btn-default" onClick={this._handleSave} data-dismiss="modal">
            Save</button>
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    );
  }

});

module.exports = AddATransaction;
