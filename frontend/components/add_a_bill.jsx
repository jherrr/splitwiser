var React = require('react');

var ApiUtil = require('../util/api_util');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var AutoComplete = require('./auto_complete');
var ChoosePayer = require('./choose_payer');

var UserStore = require('../stores/user');

AddABill = React.createClass({
  mixins: [LinkedStateMixin],
  _openModal: function () {
    this.setState({modalIsOpen: true});
  },
  _closeModal: function () {
    this.setState({modalIsOpen: false});
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
  attrs: {
    description: "",
    modalIsOpen: false,
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
    debugger;
    this.state.participants
  },
  render: function () {
    var modalClass = 'modal';
    if (this.state.modalIsOpen) {
      modalClass += ' is-active'
    }

    var listOfParticipants = (
      <ul>
        {
          this.state.participants.map ( function( participant ) {
            return ( <li> {participant.username} </li> );
          })
        }
      </ul>
    )

    return(
      <div id="add-a-bill">
        <button onClick={this._openModal}>Add A Bill</button>
        <section id="modal" className={modalClass}>
          <article className="modal-content">
            <span className="modal-close" onClick={this._closeModal}>&times;</span>
            <button onClick={this._closeModal}>cancel</button>

            <AutoComplete users={this.state.users} autoCallback={this._addParticipant} />
            {listOfParticipants}

            <form className='new-bill' onSubmit={this.createBill}>

              <label htmlFor='bill-event-description-type'>Description</label>
              <input type='text' id='bill-event-description-type' valueLink={this.linkState("description")} />

              <label htmlFor='bill-dollar-amt'>Bill Amount</label>
              <input type='text' id='bill-dollar-amt' valueLink={this.linkState("description")} />

              <button>Save</button>
            </form>

          </article>
          <ChoosePayer users={this.state.users} payerCallback={this._selectPayer} />
          <div className="modal-screen" onClick={this._closeModal}></div>
        </section>
      </div>
    );
  }

});

module.exports = AddABill;
