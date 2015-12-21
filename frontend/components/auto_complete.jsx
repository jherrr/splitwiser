var React = require('react');


var AutoComplete = React.createClass({
  getInitialState: function () {
    return { inputVal: "", users: []};
  },
  handleInput: function (event) {
    var inputVal = event.currentTarget.value;
    var users = this.matches(inputVal);

    this.setState({ inputVal: inputVal, users: users });
  },
  addName: function ( event ) {
    if ( event.which === 13 ) {
      var a = document.getElementById('search-bar-drop-down').focus();
      // .focus();
      // debugger;
    }
  },
  addNameSelected: function (e) {
    var username = e.currentTarget.value
    var userid = e.currentTarget.selectedOptions[0].dataset.userid;
    debugger;
    this.props.autoCallback(username);
    this.setState({inputVal: ""});
  },
  matches: function ( inputVal ) {
    var matches = [];
    if(inputVal.length === 0){
      return [];
    }

    this.props.users.forEach(function (user) {
      var sub = user.username.slice(0, inputVal.length);
      if(sub.toLowerCase() === inputVal.toLowerCase()){
        matches.push(user);
      }
    }.bind(this));

    return matches;
  },
  display_matches: function () {
    var users = this.state.users;
    var intermediate;
    var display = "No matches";

    if (users.length > 0) {
      intermediate = users.map(function (result, i) {
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
        <input id="search-bar-drop-down" onChange={this.handleInput} value={this.state.inputVal}
          onKeyUp={ this.addName } />
        {
          display
        }
      </div>
    );
  }
});

module.exports = AutoComplete;
