var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var root = document.getElementById('content');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var ApiUtil = require('./util/api_util');
var TransactionStore = require('./stores/transaction');

var TransactionIndex = require('./components/transaction_index');

var App = React.createClass({
  render: function(){
    return (
      <div id="app">
        <header><h1>SplitWiser</h1></header>
        <TransactionIndex />
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>

  </Route>
);

ReactDOM.render(<Router>{routes}</Router>, root);
