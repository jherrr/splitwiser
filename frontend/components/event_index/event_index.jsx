var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ApiUtil = require('../../util/api_util');

var IndexStore = require('../../stores/index');

var EventItem = require('./event_item');
var SplitItem = require('./split_item');
var TransactionItem = require('./transaction_item');

var EventIndex = React.createClass({
  _indexChanged: function() {
    this.setState({listItems: IndexStore.all()});
  },
  getInitialState: function() {
    return {listItems: []};
  },
  componentDidMount: function() {
    this.indexListener = IndexStore.addListener( this._indexChanged );
  },
  componentWillUnmount: function() {
    this.indexListener.remove();
  },
  render: function() {
    var userFilter = this.props.userFilter;

    var listItems = this.state.listItems.map(function (listItem, idx) {
      if (listItem.userFilter !== userFilter) {
        if (listItem.objType === "event") {
          return <EventItem key={idx} _event={listItem} />;
        } else if (listItem.objType === "split") {
          return <SplitItem key={idx} split={listItem} />;
        } else if (listItem.objType === "transaction") {
          return <TransactionItem key={idx} transaction={listItem}/>;
        }
      }
    });

    return(
      <div className="col-md-12 index-container">
        <div className="row event-panel">
          <ul id="list-items">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
                {listItems}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = EventIndex;
