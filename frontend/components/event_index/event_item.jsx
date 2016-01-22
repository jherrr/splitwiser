var React = require('react');

EventItem = React.createClass({
  render: function() {
    var _event = this.props._event;

    return (
      <li className="event-index-item event-item">
          You paid ${(_event.dollar_amt)/100} <br />
           for {_event.description} on {_event.event_date}
      </li>
    );
  }
});

module.exports = EventItem;
