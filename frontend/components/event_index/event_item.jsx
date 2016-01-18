var React = require('react');

EventItem = React.createClass({
  render: function() {
    var _event = this.props._event;

    return (
      <li className="event-index-item event-item">
        <p>{_event.event_date}
           {_event.lender_username}
           {_event.description}
          ${(_event.dollar_amt)/100}</p>
      </li>
    );
  }
});

module.exports = EventItem;
