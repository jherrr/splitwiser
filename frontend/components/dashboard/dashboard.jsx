var React = require('react');

var UserStore = require('../../stores/user');
var ApiUtil = require('../../util/api_util');

var NavBar = require('../navbar/navbar');
var BalanceBook = require('../balance_book');
var AddABill = require('../add_a_bill/add_a_bill');

var UserIndex = require('./user_index');
var EventIndex = require('../event_index/event_index');

var DashBoard = React.createClass({
  getInitialState: function() {
    return {eventIndex: {type: "all"}};
  },
  componentDidMount: function() {
    ApiUtil.fetchUsers();
    ApiUtil.fetchBalances(window.user_id);
    ApiUtil.fetchAllIndex(window.user_id);
  },
  _selectUser: function( eventIndex ) {

    if (eventIndex.type === "all") {
      ApiUtil.fetchAllIndex(window.user_id);
    } else if (eventIndex.type === "user") {
      ApiUtil.fetchUserIndex(window.user_id, eventIndex.id);
    }

    this.setState({eventIndex: eventIndex});
  },
  render: function() {
    return (
      <div id="dashboard" className='background-container'>
        <NavBar />
          <div className="below-nav-container">
            <div className="col-xs-offset-1 col-xs-10 background-filter">
              <div className="row">
                <BalanceBook user_id={window.user_id} className="balance-container" />
              </div>

              <div className="row stretch-height">
                <div className="col-md-4">
                  <div className="row stretch-height">
                    <UserIndex callback={this._selectUser}/>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row stretch-height">
                    <EventIndex eventIndex={this.state.eventIndex}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom col-md-12"></div>
      </div>
    );
  }

});

module.exports = DashBoard;
