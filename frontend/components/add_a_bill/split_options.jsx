var React = require('react');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

SplitOptions = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function () {
    return {participants: this.props.participants, selected: [],
       splitType: this.props.splitType, dollar_amt: this.props.dollar_amt } ;
  },
  display: function () {
    var sltOpt = this.state.splitType;
    var listItems;
    var participants = this.state.participants;
    var dollar_amt = (this.state.dollar_amt/parseFloat(100)).toFixed(2);


    if ( sltOpt === "equally" ) {
      listItems = participants.map( function ( participant ) {
        return <div className="row split-option-user-row" key={participant.id}>
          <div key="checkbox" className="col-md-1 col-sm-1">
            <input type="checkbox" onChange={ this.handleChecked } />
          </ div>
          <div key="username" className="col-md-3 col-sm-3">
            {participant.username}
          </div>
          <div key="dollar-amt" className="col-md-1 col-sm-1">$ {dollar_amt}</div>
        </div>
      });
    } else if ( sltOpt === "exact_amounts") {
      listItems = participants.map( function ( participant ) {
        return <div class="input-group">
            <span class="input-group-addon">$</span>
            <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
        </div>
      })
    }

    var output = <div>
      {
        listItems
      }
    </ div> ;

    return output;
  },
  render: function () {
    return this.display();
  }
});

module.exports = SplitOptions;
