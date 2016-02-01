var React = require('react');

var SessionModal = require('./session_modal');

HomePage = React.createClass({
  render: function() {

    return (
      <div className="homepage-background">
        <div className="homepage-content">
          <h1>All Set!</h1>
          <h2>Pick up the check. Cover the expenses.</h2>
          Then share the bills and make sure everyone is paid back.
        </div>
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

        <SessionModal />
      </div>

    );
  }
});

module.exports = HomePage;
