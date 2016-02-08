var React = require('react');

SplitItem = React.createClass({
  render: function() {
    var split = this.props.split;

    return (
      <li className="event-index-item event-item">
          {split.event_owner_name} paid ${(split.dollar_amt/100).toFixed(2)} for you on {split.event_date}. <br />
          This was for {split.event_description}.
      </li>
    );
  }
});

module.exports = SplitItem;
