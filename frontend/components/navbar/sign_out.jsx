var React = require('react');

var ApiUtil = require('../../util/api_util');

SignOut = React.createClass({
  _handleSignOut: function ( e ) {
    ApiUtil.destroySession ();
  },
  render: function() {

    return (
        <li>
          <a href="/" onClick={this._handleSignOut}>Sign Out</a>
        </li>
    );
  }
});

module.exports = SignOut;
