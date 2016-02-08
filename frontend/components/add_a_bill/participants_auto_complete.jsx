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
    var searchBarDropDownStyle = {}
    var list;

    if (users.length > 0) {
      intermediate = users.map(function (result, i) {
          var styleLi = {};
          if ( i === this.state.selectedItemIdx ) {
            styleLi = { background: "#f2f2f2" }
          }

          return <li className="search-bar-item" key={i} data-userid={result.id}
            style={styleLi} >
              <span
                className="col-md-offset-1 col-sm-offset-1 col-xs-1">
                {result.username}</span>
            </li> ;
          }.bind(this));

      list = <ul id="search-bar-drop-down"
        className="col-sm-offset-1 col-md-offset-1 col-xs-offset-1
         col-md-10 col-sm-10 col-xs-10">
        {
          intermediate
        }
      </ul>
    }

    display = (
      <div>
        <div className="row">
          <div className="input-group col-sm-offset-1 col-md-offset-1 col-xs-offset-1
             col-md-10 col-sm-10 col-xs-10">
            <span className="input-group-addon" id="basic-addon2">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </span>
            <input type="text" className="form-control session-input" placeholder="add a participant"
              aria-describedby="basic-addon1"
              onChange={this.handleInput} value={this.state.inputVal}
                onKeyDown={ this.handleKey }
              />
          </div>
        </div>
        <div className="row">
          {
            list
          }
        </div>
      </div>
    );

    return display;
  },
  selectName: function (event) {
    var name = event.currentTarget.innerText;
    this.setState({ inputVal: name });
  },
  render: function () {
    var display = this.display_matches();

    return(
        display
    );
  }
});

module.exports = AutoComplete;
