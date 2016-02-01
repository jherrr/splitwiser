var React = require('react');

var SessionForm = require('./session_form');

SessionModal = React.createClass({
  getInitialState: function () {
    return {username: "", password: "", textStyle: this.__textStyleBlur };
  },
  render: function() {

    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content session-modal-content">
            <SessionForm />
          </div>

        </div>
      </div>

    );
  }
});

module.exports = SessionModal;
