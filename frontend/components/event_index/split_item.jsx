var React = require('react');

SplitItem = React.createClass({
  render: function() {
    var split = this.props.split;

    return (
      <li className="event-index-item event-item">
        <p>{split.dollar_amt}
            {split.username}
            {split.event_date}
            {split.event_description}
            {split.event_owner_name}
        </p>
      </li>
    );
  }
});

module.exports = SplitItem;
