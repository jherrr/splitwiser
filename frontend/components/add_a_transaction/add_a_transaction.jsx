var React = require('react');

var ApiUtil = require('../../util/api_util');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ReceivePaymentAutoComplete = require('./receive_payment_auto_complete.jsx');
var DatePicker= require('./date_picker');

var ChoosePayer = require('../add_a_bill/choose_payer');

var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');

AddATransaction = React.createClass({
  mixins: [LinkedStateMixin],
  _openModal: function () {
    this.setState({modalIsOpen: true});
  },
  _closeModal: function () {
    this.setState({modalIsOpen: false});
  },
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
      <div id="add-a-transaction">
        <section id="transaction-modal" className="modal fade">
          <div id="myModal-container" className="row">
              <article className="modal-content myModal-content col-sm-12 col-md-12">
                <span className="modal-close" data-dismiss="modal">&times;</span>
                You Will Pay:
                <ReceivePaymentAutoComplete users={this.state.users} autoCallback={this._selectPerson} />

                <form className='new-bill' onSubmit={this.createBill}>
                  <label htmlFor='transaction-dollar-amt' className='add-bill-input-label'>Bill Amount</label>
                  <input type='text' id='transaction-dollar-amt' className="add-bill-input"
                    onChange={this._handleDollarAmt} onBlur={this._formatDollarAmt} value={this.state.dollar_amt} />

                  <br />
                  <label htmlFor='transaction-date-picker' className="add-bill-input-label">Date</label>
                  <DatePicker id='transaction-date-picker' dateCallback={this._handleDate}></DatePicker>
                </form>

                <button className="btn button-small" onClick={this._handleSave} data-dismiss="modal">
                  Save</button>
                <button type="button" className="btn button-small" data-dismiss="modal">cancel</button>
              </article>

            </div>

        </section>
      </div>
    );
  }

});

module.exports = AddATransaction;
