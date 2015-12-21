var React = require('react');

var ApiUtil = require('../util/api_util');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

var AutoComplete = require('./auto_complete');

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
  _addUser: function (selectedUser) {
    var users = this.state.participantNames
    users.push(selectedUser);
    this.setState({participantNames: users});
  },
  attrs: {
    modalIsOpen: false,
    names: [],
    users: UserStore.users(),
    participantNames: []
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
    this.state.participantNames
  },
  render: function () {
    var modalClass = 'modal';
    if (this.state.modalIsOpen) {
      modalClass += ' is-active'
    }

    var listOfParticipants = (
      <ul>
        {
          this.state.participantNames.map ( function( participantName ) {
            return ( <li> {participantName} </li> );
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


            <AutoComplete users={this.state.users} autoCallback={this._addUser} />
            {listOfParticipants}

            <form className='new-bill' onSubmit={this.createBill}>

              <button>Save</button>
            </form>

          </article>
          <div className="modal-screen" onClick={this._closeModal}></div>
        </section>
      </div>
    );
  }

});

module.exports = AddABill;
