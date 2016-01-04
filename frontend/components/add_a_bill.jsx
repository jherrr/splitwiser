var React = require('react');

var ApiUtil = require('../util/api_util');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var AutoComplete = require('./auto_complete');
var ChoosePayer = require('./choose_payer');
var SplitOptions = require('./add_a_bill/split_options');

var UserStore = require('../stores/user');

AddABill = React.createClass({
  mixins: [LinkedStateMixin],
  _openModal: function () {
    this.setState({modalIsOpen: true});
  },
  _closeModal: function () {
    this.setState({modalIsOpen: false});
  },
  _toggleSubModal: function () {
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

    this.setState({participants: participants, users: users});
  },
  _selectPayer: function () {

  },
  _handleDollarAmt: function () {

  },
  attrs: {
    description: "",
    dollar_amt: parseFloat(0).toFixed(2),
    modalIsOpen: false,
    subModalIsOpen: false,
    splitType: "equally",
    names: [],
    users: UserStore.users(),
    participants: []
  },
  getInitialState: function () {
    return this.attrs;
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._usersChanged);
    ApiUtil.fetchUsers();
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
      <ul>
        {
          this.state.participants.map ( function( participant ) {
            return ( <li key={participant.id} > {participant.username} </li> );
          })
        }
      </ul>
    )

    return(
      <div id="add-a-bill">
        <button type="button" className="btn button-colored" data-toggle="modal" data-target="#myModal">
          Add A Bill</button>

        <section id="myModal" className="modal fade">
          <div id="myModal-container" className="row">
              <article className="modal-content myModal-content col-sm-12 col-md-12">
                <span className="modal-close" onClick={this._closeModal}>&times;</span>
                <button type="button" className="btn" data-dismiss="modal">cancel</button>

                <AutoComplete users={this.state.users} autoCallback={this._addParticipant} />
                {listOfParticipants}

                <form className='new-bill' onSubmit={this.createBill}>

                  <label htmlFor='bill-event-description-type'>Description</label>
                  <input type='text' id='bill-event-description-type' className="add-bill-input"
                    valueLink={this.linkState("description")} />

                  <label htmlFor='bill-dollar-amt'>Bill Amount</label>
                  <input type='text' id='bill-dollar-amt' className="add-bill-input"
                    onChange={} value={this.state.dollar_amt} />

                  <div className='row'>
                    Split
                    <button onClick={this._toggleSubModal}>{this.state.splitType}</button>
                  </div>

                  <button>Save</button>
                </form>

              </article>
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



        </section>
      </div>
    );
  }

});

module.exports = AddABill;
