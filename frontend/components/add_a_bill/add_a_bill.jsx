var React = require('react');

var ApiUtil = require('../../util/api_util');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ParticipantsAutoComplete = require('./participants_auto_complete');
var PayerAutoComplete = require('./payer_auto_complete.jsx');

var ChoosePayer = require('./choose_payer');
var SplitOptions = require('./split_options');
var DatePicker= require('../date_picker');

var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');

AddABill = React.createClass({
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
  _addParticipant: function (selectedUser) {

    var participants = this.state.participants;
    participants.push(selectedUser);

    //remove user from props to AutoComplete
    var users = this.state.users;

    for ( var x = 0; x < users.length; x++ ) {
      if ( users[x].id === selectedUser.id ) {
        users.splice(x, 1);
        break;
      }
    }

    var splitType = this.state.splitType;
    var splitStateArgs = {};

    if ( splitType === "equally" ) {
      splitStateArgs = this.___participantCalculateSplit( selectedUser.id, "add" );
    }

    var newState = {participants: participants, users: users};
    $.extend(newState, splitStateArgs);


    this.setState(newState);
  },
  ___participantCalculateSplit: function ( participantID, splitOption ) {
    if ( this.state.splitType === "equally" ) {

      var splitData = this.state.splitData;
      var equallyData = this.state.equallyData;

      if ( splitOption === "add" ) {
        equallyData[participantID] = true;
      } else if ( splitOption === "remove" ) {
        delete equallyData[participantID];
      }

      splitData = this.___calculateSplits( equallyData );

      return {equallyData: equallyData, splitData: splitData};
    }

  },
  ___calculateSplits: function (equallyData) {
    var participantIDs = Object.keys(equallyData);
    var splitData = this.state.splitData;

    var divisor = participantIDs.length;
    var equalAmt = parseInt(this.state.dollar_amt * 100)/divisor;

    participantIDs.forEach( function ( participantID ) {
      splitData[participantID] = equalAmt;
    });


    return splitData;
  },
  _resetState: function () {
    blankAttrs = $.extend(this.attrs, {
      names: [],
      users: UserStore.users(),
      participants: [{username: window.username, id: window.user_id}],
      payer: {username: window.username, id: window.user_id},
      eventDate: this.state.eventDate
    });

    //setting initial split to current user
    var splitData = {};
    var equallyData = {};

    splitData[window.user_id] = parseInt( this.state.dollar_amt * 100 );
    equallyData[window.user_id] = true;


    this.setState($.extend(blankAttrs, {splitData: splitData, equallyData: equallyData}));
  },
  _selectPayer: function ( payer ) {
    this.setState({payer: payer} );
  },
  _handleDollarAmt: function (e) {
    this.setState({dollar_amt: e.target.value});
  },
  _formatDollarAmt: function (e) {
    var value = e.target.value;
    value = parseFloat(value).toFixed(2)

    var splitData = this.___calculateSplits(this.state.equallyData);

    this.setState({dollar_amt: value, splitData: splitData});

  },
  _handleDate: function(date) {
    this.setState({eventDate: date});
  },
  _handleSplit: function () {

  },
  _handleSave: function(e) {

    e.preventDefault();

    var data = {};

    var eventData = {};
    eventData["lender_id"] = window.user_id;
    eventData["description"] = this.state.description;
    eventData["dollar_amt"] = this.state.dollar_amt * 100;
    eventData["split_type"] = this.state.splitType;
    eventData["event_date"] = this.state.eventDate;
    // eventData["payer"] = this.state.payer;

    var splitData = this.state.splitData;

    data["event"] = eventData;
    data["splits"] = splitData;

    ApiUtil.createNewEvent( data );

    this._resetState();
  },
  attrs: {
    description: "",
    dollar_amt: parseFloat(0).toFixed(2),
    modalIsOpen: false,
    subModalIsOpen: false,
    splitType: "equally",
    names: [],
    users: UserStore.users(),
    participants: [],
    payer: {},
    eventDate: "",
  },
  getInitialState: function () {
    return this.attrs;
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._usersChanged);

    //setting initial split to current user
    var splitData = {};
    var equallyData = {};

    splitData[window.user_id] = parseInt( this.state.dollar_amt * 100 );
    equallyData[window.user_id] = true;
    participants = [{username: window.username, id: window.user_id}];
    payer = {username: window.username, id: window.user_id};

    this.setState({
      splitData: splitData,
      equallyData: equallyData,
      participants: participants,
      payer: payer
    });
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  selectName: function(e) {
    this.state.participants
  },
  render: function () {
    var hiddenStyle = {};

    var modalClass = 'modal';
    if (this.state.modalIsOpen) {
      modalClass += ' is-active'
    }

    var subModalContentClass = "sub-modal col-sm-6 col-md-6";
    if (this.state.subModalIsOpen) {
      subModalContentClass += ' is-active'

    } else {
        hiddenStyle.display = "none";
    }

    var listOfParticipants = (
      <ul id="jeff" className='list-of-participants'>
        {
          this.state.participants.map ( function( participant ) {
            return ( <li className="row" key={participant.id} >
                <div
                  className="participant-item col-md-offset-1 col-sm-offset-1 col-xs-offset-1
                   col-md-10 col-sm-10 col-xs-10">
                    {participant.username}
                </div>
              </li> );
          })
        }
      </ul>
    )

    return(
      <div>
          <div className="modal-body">
            <ParticipantsAutoComplete users={this.state.users} autoCallback={this._addParticipant} />
            <div className="row">
              <div
                className="participant-header col-md-offset-1 col-sm-offset-1 col-xs-offset-1
                col-md-10 col-sm-10 col-xs-10">
                Participants:
              </div>
            </div>
            {listOfParticipants}

            <PayerAutoComplete currentUsername={this.state.payer.username} users={this.state.users} autoCallback={this._selectPayer} />

            <form className='new-bill' onSubmit={this.createBill}>
              <div className="row bill-description">
                <div className="input-group col-sm-offset-1 col-md-offset-1 col-xs-offset-1
                   col-md-10 col-sm-10 col-xs-10">
                  <span className="input-group-addon" id="basic-addon4">
                    <span className="glyphicon glyphicon-list" aria-hidden="true"></span>
                  </span>
                  <input type="text" className="form-control session-input"
                    placeholder="Description"
                    aria-describedby="basic-addon1"
                    valueLink={this.linkState("description")}
                    />
                </div>
              </div>

              <div className="row bill-amt">
                <div className="input-group col-sm-offset-1 col-md-offset-1 col-xs-offset-1
                   col-md-10 col-sm-10 col-xs-10">
                  <span className="input-group-addon" id="basic-addon5">
                    <span className="glyphicon glyphicon-usd" aria-hidden="true"></span>
                  </span>
                  <input type="text" className="form-control session-input"
                    placeholder="Bill Amount"
                    aria-describedby="basic-addon1"
                    onChange={this._handleDollarAmt}
                    onBlur={this._formatDollarAmt}
                    value={this.state.dollar_amt}
                    />
                </div>
              </div>

              <DatePicker id='bill-date-picker' dateCallback={this._handleDate}></DatePicker>
            </form>

            <div className='row'>
              <label htmlFor='sub-modal-button'>Split: </label>
              <button className="btn button-small" id="sub-modal-button"
                onClick={this._toggleSubModal}>{this.state.splitType}</button>
            </div>



            <article className="modal-content myModal-content col-sm-12 col-md-12" style={hiddenStyle} >
              <div>
                <button type="button" className="button-split-type btn-primary">Equally</button>
                <button type="button" className="button-split-type btn-primary">Percentage</button>
                <button type="button" className="button-split-type btn-primary">Exact Amounts</button>
              </div>
              <SplitOptions participants={this.state.participants} dollar_amt={this.state.dollar_amt}
                splitType={this.state.splitType} />
              <ChoosePayer users={this.state.users} payerCallback={this._selectPayer} />
            </article>
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

module.exports = AddABill;
