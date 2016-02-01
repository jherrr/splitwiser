var React = require('react');

var SessionModal = require('./session_modal');

HomePage = React.createClass({
  render: function() {

    return (
      <div className="homepage-background">
        <div className="homepage-content">
          <h1 className="homepage-heading1">All Set!</h1>
          <h2 className="homepage-heading2">Pick up the check. Cover the expenses.</h2>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xs-12">
              Then share the bills and make sure everyone is paid back.
            </div>
          </div>

          <div className="homepage-spacing" />

          <div className="row">
            <div className="col-sm-12 col-md-12 col-xs-12">
              <button
                type="button"
                className="btn btn-info btn-lg"
                data-toggle="modal"
                data-target="#myModal">Get Ready,  Set,  Go!</button>
            </div>
          </div>
        </div>

        <SessionModal />
      </div>

    );
  }
});

module.exports = HomePage;
