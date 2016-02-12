var React = require('react');

SplitItem = React.createClass({
  render: function() {
    var split = this.props.split;

    var output;

    if ( split.event_owner_id !== window.user_id) {
      output = <span> {split.event_owner_name} paid ${(split.dollar_amt/100).toFixed(2)} for you on {split.event_date}. <br />
        This was for {split.event_description}. </span>
    } else {
      output = <span> You paid ${(split.dollar_amt/100).toFixed(2)} for {split.username} on {split.event_date}. <br />
        This was for {split.event_description}. </span>
    }

    return (
      <li className="event-index-item event-item">
        {output}
      </li>
    );
  }
});

module.exports = SplitItem;
