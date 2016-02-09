var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var root = document.getElementById('content');
var ApiUtil = require('./util/api_util');

var DashBoard = require('./components/dashboard/dashboard');
var SessionForm = require('./components/session/session_form');

var UserStore = require('./stores/user');
var SessionStore = require('./stores/session');

var BillModal = require('./components/add_a_bill/bill_modal');
var TransactionModal = require('./components/add_a_transaction/transaction_modal');
var HomePage = require('./components/session/home_page');

var App = React.createClass({
  render: function(){
    return (
      <div id="app">
        <header><h1>AllSet</h1></header>
        <TransactionModal />
        <BillModal />
        {this.props.children}
      </div>
    );
  }
});

var preventIfLoggedIn = function (nextState, replaceState) {

  if ( window.user_id === undefined && window.username === undefined ) {
    replaceState(null, "/");
  }
};

var routes = (
  <Router >
    <Route path="/">
      <Route path="app" component={App}>
        <Route path='dashboard' component={DashBoard} onEnter={ preventIfLoggedIn } />
      </Route>
      <IndexRoute component={HomePage} />
    </Route>
  </Router>

);

window.SessionStore = SessionStore;
window.BalanceStore = require('./stores/balance');
window.IndexStore = require('./stores/index');
window.ApiUtil = ApiUtil;
window.UserStore = UserStore;

ReactDOM.render(<Router>{routes}</Router>, root);
