var React = require('react');


var AutoComplete = React.createClass({
  _initialAttrs: {
    inputVal: "",
    users: [],
    selectedItemIdx: 0
  },
  getInitialState: function () {
    return this._initialAttrs;
  },
  handleInput: function (event) {
    var inputVal = event.currentTarget.value;
    var users = this.matches(inputVal);

    this.setState({ inputVal: inputVal, users: users });
  },
  handleKey: function ( event ) {
    if ( event.which === 13 ) {
      this.addNameSelected();

    } else if ( event.which === 38 ) {
      event.preventDefault();
      var idx = this.state.selectedItemIdx;
      if ( idx > 0 ) {
        this.setState({selectedItemIdx: idx - 1});
      }
    } else if ( event.which === 40 ) {
      event.preventDefault();
      var idx = this.state.selectedItemIdx;

      if ( idx < this.state.users.length - 1) {
        this.setState({selectedItemIdx: idx + 1});
      }
    }

  },
  addNameSelected: function (e) {
    var output = this.state.users[this.state.selectedItemIdx];

    this.props.autoCallback(output);
    this.setState(this._initialAttrs);
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
          var style = {};
          if ( i === this.state.selectedItemIdx ) {
            style = { background: "#ccc" }
          }

          return <li className="search-bar-item" key={i} data-userid={result.id}
          style={style} >
          {result.username} </ li> ;
          }.bind(this));


      display = (
        <ul id="search-bar-drop-down">
          {
            intermediate
          }
        </ ul>
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
        <input id="search-bar" onChange={this.handleInput} value={this.state.inputVal}
          onKeyDown={ this.handleKey } />
        {
          display
        }
      </div>
    );
  }
});

module.exports = AutoComplete;
