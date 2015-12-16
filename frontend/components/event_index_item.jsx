var React = require('react');
var History = require('react-router').History;

EventIndexItem = React.createClass({
  mixins: [History],
  showDetail: function() {
    this.history.pushState(null, '/event/' + this.props._event.id, {});
  },
  render: function() {
    var _event = this.props._event;
    return (
      <li className="event-index-item" onClick={this.showDetail}>
        <p>{_event.lender.username}</p>
        <p>{_event.item}</p>
        <p>{_event.description}</p>
        <p>${(_event.dollar_amt)/100}</p>
        <p>{_event.created_at}</p>
        <p>{_event.settled}</p>
      </li>
    );
  }
});

module.exports = EventIndexItem;
