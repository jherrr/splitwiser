var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ApiUtil = require('../../util/api_util');

var IndexStore = require('../../stores/index');

var EventItem = require('./event_item');
var SplitItem = require('./split_item');
var TransactionItem = require('./transaction_item');

var EventIndex = React.createClass({
  _indexChanged: function() {
    
    var type = this.props.eventIndex
    if (type.type === "all") {
      this.setState({listItems: IndexStore.all()});
    } else if (type.type === "user") {
      this.setState({listItems:IndexStore.userAll()});
    }
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
    var key;
    var listItems = this.state.listItems.map(function (listItem) {
      if (listItem.objType === "event") {
        key = "e" + listItem.event_id;
        return <EventItem key={key} _event={listItem} />;
      } else if (listItem.objType === "split") {
        key = "s" + listItem.split_id
        return <SplitItem key={key} split={listItem} />;
      } else if (listItem.objType === "transaction") {
        key = "t" + listItem.transaction_id
        return <TransactionItem key={key} transaction={listItem}/>;
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
