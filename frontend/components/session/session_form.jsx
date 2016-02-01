var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var SessionStore = require('../../stores/session');

var ApiUtil = require('../../util/api_util');

SessionForm = React.createClass({
  mixins: [LinkedStateMixin, History],
  _handleSubmit: function ( e ) {
    e.preventDefault();

    var output = {user: {username: this.state.username,
       password: this.state.password}};

    ApiUtil.createNewSession ( output );
  },
  _handleGuestSubmit: function ( e ) {
    e.preventDefault();

    ApiUtil.createGuestSession();
  },
  __blankAttrs: {
    username: "username"
  },
  ___loginRedirect: function () {
    this.history.pushState(null, '/app/dashboard', {});
  },
  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this.___loginRedirect);
  },
  componentWillUnmount: function() {
    this.sessionListener.remove();
  },
  getInitialState: function () {
    return { username: "", password: "" };
  },
  render: function() {

    return (
        <div className="login-overlay">

          <div className="session-form-spacing" />

          <div className="row session-form">
            <div className='col-md-offset-1 col-md-10 session-form-content'>

              <form>
                <div className="input-group session-group">
                  <span className="input-group-addon" id="basic-addon1">
                    <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  </span>
                  <input type="text" className="form-control session-input" placeholder="username"
                    aria-describedby="basic-addon1"
                    valueLink={this.linkState("username")}
                    />
                </div>

                <div className="input-group session-group">
                  <span className="input-group-addon" id="basic-addon1">
                    <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
                  </span>
                  <input type="password" className="form-control session-input" placeholder="password"
                    aria-describedby="basic-addon1"
                    valueLink={this.linkState("password")}
                    />
                </div>

              </form>

            </div>
          </div>

          <div className="row session-row">
            <div className='col-md-offset-1 col-md-10 session-row-content'
              onClick={ this._handleSubmit } data-dismiss="modal">
              Sign In
            </div>
          </div>

          <div className="row session-row">
            <div className='col-md-offset-1 col-md-10 session-row-content'
              data-dismiss="modal">
              Create new account
            </div>
          </div>

          <div className="row session-row">
            <div className='col-md-offset-1 col-md-10 session-row-content'
              onClick={ this._handleGuestSubmit }
              data-dismiss="modal" >
              Sign into demo account!
            </div>
          </div>

        </div>
    );
  }
});

module.exports = SessionForm;
