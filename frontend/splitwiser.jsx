var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var root = document.getElementById('content');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var ApiUtil = require('./util/api_util');

var DashBoard = require('./components/dashboard');

var TransactionIndex = require('./components/transaction_index');

var EventStore = require('./stores/event');
var TransactionStore = require('./stores/transaction');
var EventSplitStore = require('./stores/event_split');
var UserStore = require('./stores/user');
var CurrentUserStore = require('./stores/current_user');

var AppConstants = require('./constants/app_constants');

var App = React.createClass({
  getInitialState: function() {
    return {viewType: AppConstants.ALL_EXPENSES};
  },
  render: function(){
    return (
      <div id="app">
        <header><h1>SplitWiser</h1></header>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <Route path='dashboard' component={DashBoard} />
    <Route path='transactionIndex' component={TransactionIndex} />
  </Route>
);

window.EventSplitStore = EventSplitStore;
window.EventStore = EventStore;
window.TransactionStore = TransactionStore;
window.ApiUtil = ApiUtil;
window.UserStore = UserStore;
window.CurrentUserStore = CurrentUserStore;

ReactDOM.render(<Router>{routes}</Router>, root);
