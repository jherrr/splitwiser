var React = require('react');

var ApiUtil = require('../../util/api_util');

var IndexStore = require('../../stores/index');

var EventItem = require('./event_item');
var SplitItem = require('./split_item');

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
    var listItems = this.state.listItems.map(function (listItem, idx) {
      if (listItem.objType === "event") {
        return <EventItem key={idx} _event={listItem} />;
      } else if (listItem.objType === "split") {
        return <SplitItem kye={idx} split={listItem} />;
      }
    });

    return(
      <div id="event-index">
        <ul id="list-items">
          {listItems}
        </ul>
      </div>
    );
  }
});

module.exports = EventIndex;
