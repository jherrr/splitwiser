var React = require('react');


var AutoComplete = React.createClass({
  getInitialState: function () {
    return { inputVal: "", users: []};
  },
  handleInput: function (event) {
    var inputVal = event.currentTarget.value;
    var users = this.matches();

    debugger;
    this.setState({ inputVal: event.currentTarget.value });
  },
  addName: function ( event ) {
    if ( event.which === 13 ) {
      debugger;
      if ( this.state.users.length > 0 ) {
        this.props.autoCallback(this.state.inputVal);
        this.setState({inputVal: ""});
      } else {
        alert("Person doesn't exist");
      }
    }
  },
  addNameSelected: function (e) {
    var username = e.currentTarget.value
    var userid = e.currentTarget.selectedOptions[0].dataset.userid;
    debugger;
    this.props.autoCallback(username);
    this.setState({inputVal: ""});
  },
  matches: function () {
    var matches = [];
    if(this.state.inputVal.length === 0){
      return this.state.users;
    }

    this.props.users.forEach(function (user) {
      var sub = user.username.slice(0, this.state.inputVal.length);
      if(sub.toLowerCase() === this.state.inputVal.toLowerCase()){
        matches.push(user);
      }
    }.bind(this));

    return matches;
  },
  display_matches: function () {
    var results = this.matches();
    var intermediate;
    var display = "No matches";

    if (results.length > 0) {
      intermediate = results.map(function (result, i) {
          return <option key={i} data-userid={result.id} >{result.username} </ option> ;
          }.bind(this));
      intermediate.push(<option key={-1} disabled hidden value='' />);

      display = (
        <select defaultValue='' onChange={this.addNameSelected}>
          {
            intermediate
          }
        </select>
      );
    }

    return display;
  },
  selectName: function (event) {
    var name = event.currentTarget.innerText;
    this.setState({ inputVal: name });
  },
  render: function () {
    var display = this.display_matches();

    return(
      <div>
        <input onChange={this.handleInput} value={this.state.inputVal}
          onKeyUp={ this.addName } />
        {
          display
        }
      </div>
    );
  }
});

module.exports = AutoComplete;
