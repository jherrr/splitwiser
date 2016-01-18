var React = require('react');

EventItem = React.createClass({
  render: function() {
    var _event = this.props._event;

    debugger;

    return (
      <li className="event-index-item">
        <p>{_event.event_date}</p>
        <p>{_event.lender_username}</p>
        <p>{_event.description}</p>
        <p>${(_event.dollar_amt)/100}</p>
      </li>
    );
  }
});

module.exports = EventItem;
