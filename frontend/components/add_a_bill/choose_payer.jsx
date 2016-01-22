var React = require('react');

var ChoosePayer = React.createClass({
  getInitialState: function () {
    return { users: [], selectedIdx: 0 };
  },
  handleClick: function () {
    
  },
  componentDidMount: function () {
    var selectedIdx = 0;
    this.props.users.forEach( function ( user, idx ) {
      if ( user.id === window.user_id ) {
        selectedIdx = idx;
      }
    });

    this.setState({users: this.props.users, selectedIdx: selectedIdx});
  },
  _choosePersonDropDownDisplay: function () {
    return this.props.users.map( function(user, idx) {
      var style = {};
      if ( this.state.selectedIdx === idx ) {
        style = {background: "#ccc"};
      }

      return (
        <li key={idx} onClick={this.handleClick} style={style}>
          {user.username}
        </li>
      )
    });
  },
  render: function () {
    return(
      <div>
        {this._choosePsersonDropDownDisplay}
      </div>
    );

  }
});

module.exports = ChoosePayer;
