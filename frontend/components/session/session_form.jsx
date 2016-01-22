var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var SessionStore = require('../../stores/session');

var ApiUtil = require('../../util/api_util');

var TextInputMixin = require('../../mixins/text_input');

SessionForm = React.createClass({
  mixins: [LinkedStateMixin, TextInputMixin, History],
  _handleSubmit: function ( e ) {
    e.preventDefault();

    var output = {user: {username: this.state.username,
       password: this.state.password}};

    ApiUtil.createNewSession ( output );
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
    return {username: "", password: "", textStyle: this.__textStyleBlur };
  },
  render: function() {

    return (
      <div className="log-in-background-container">
        <div className="login-overlay">
          <div className="session-form-container row">
            <div className='col-md-offset-1 col-md-5'>
              <h1>Login</h1>

              <form>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">
                    <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  </span>
                  <input type="text" className="form-control" placeholder="username"
                    aria-describedby="basic-addon1"
                    valueLink={this.linkState("username")}
                     />
                </div>

                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">
                    <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
                  </span>
                  <input type="password" className="form-control" placeholder="password"
                    aria-describedby="basic-addon1"
                    valueLink={this.linkState("password")}
                     />
                </div>

                <input onClick={ this._handleSubmit }
                  type="submit" />
              </form>

            </div>
          </div>
        </div>
      </div>

    );
  }
});

module.exports = SessionForm;
