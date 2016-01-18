var React = require('react');

var SignOut = require('./sign_out');

var NavBar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active" data-toggle="modal" data-target="#myModal">Add A Bill</li>
              <li><a href="#">Link</a></li>

            </ul>

            <ul className="nav navbar-nav navbar-right">
              <SignOut />
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = NavBar;
