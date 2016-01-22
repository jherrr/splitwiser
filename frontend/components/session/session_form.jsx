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
    return {username: "username", password: "", textStyle: this.__textStyleBlur };
  },
  render: function() {

    return (
      <div className="log-in-background-container">
        <div className="login-overlay">
          <div className="session-form-container row">
            <div className='col-md-offset-1 col-md-5'>
              <h1>Login</h1>

              <form>
                <label htmlFor="user_username">Username</label>
                <input
                  type="text"
                  style={ this.state.textStyle }
                  onFocus={ this._textFocus.bind(this, {username: this.state.username}) }
                  onBlur={ this._textBlur.bind(this, {username: "username"}) }
                  valueLink={this.linkState("username")}
                  id="user_username" />

                <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">Username</span>
                  <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
                </div>

                <label htmlFor="user_password">Password</label>
                <input
                  type="password"
                  name="user[password]"
                  valueLink={this.linkState("password")}
                  id="user_password" />

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
