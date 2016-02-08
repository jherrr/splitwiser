var React = require('react');

var AutoComplete = React.createClass({
  getInitialState: function () {
    return {inputVal: "", users: [], selectedItemIdx: 0};
  },
  handleInput: function (event) {
    var inputVal = event.currentTarget.value;
    var users = this.matches(inputVal);

    this.setState({ inputVal: inputVal, users: users });
  },
  handleKey: function ( event ) {
    if ( event.which === 13 ) {
      this.selectNameSelected();
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
  selectNameSelected: function (e) {
    var output = this.state.users[this.state.selectedItemIdx];

    this.props.autoCallback(output);
    this.setState({inputVal: output.username, users: [], selectedItemIdx: 0});
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
    var list;

    if (users.length > 0) {
      intermediate = users.map(function (result, i) {
          var style = {};
          if ( i === this.state.selectedItemIdx ) {
            style = { background: "#f2f2f2" }
          }

          return <li className="search-bar-item" key={i} data-userid={result.id}
          style={style} >
            <span
              className="col-md-offset-1 col-sm-offset-1 col-xs-1">
              {result.username}</span>
          </ li> ;
          }.bind(this));

          list = <ul
            id="search-bar-drop-down"
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
          <div
            className="payer-header col-sm-offset-1 col-xs-offset-1
             col-md-offset-1 col-md-10 col-sm-10 col-xs-10">
             You Will Pay:
          </div>
        </div>
        <div className="row">
          <div className="input-group col-sm-offset-1 col-md-offset-1 col-xs-offset-1
             col-md-10 col-sm-10 col-xs-10">
            <span className="input-group-addon payer-addon" id="basic-addon3">
              <span className="glyphicon glyphicon-credit-card" aria-hidden="true"></span>
            </span>
            <input type="text" className="form-control session-input payer-input"
              placeholder="Recipient"
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
