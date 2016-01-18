var React = require('react');

var AutoComplete = React.createClass({
  getInitialState: function () {
    return {inputVal: "", users: [], selectedItemIdx: 0};
  },
  componentDidMount: function () {
    this.setState({inputVal: this.props.currentUsername, users: [], selectedItemIdx: 0});
  },
  handleInput: function (event) {
    var inputVal = event.currentTarget.value;
    var users = this.matches(inputVal);

    this.setState({ inputVal: inputVal, users: users });
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({inputVal: newProps.currentUsername});
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
    var searchBarDropDownStyle = {}

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

    }

    display = (
      <div className="col-md-12 col-sm-12">
          <label htmlFor='search-bar' className='add-bill-input-label'>Paid By</label>
          <input id="search-bar" onChange={this.handleInput} value={this.state.inputVal}
            onKeyDown={ this.handleKey } className="add-bill-input" />
          <ul id="search-bar-drop-down">
            {
              intermediate
            }
          </ ul>
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
      <div className="row">
        {
          display
        }
      </div>
    );
  }
});

module.exports = AutoComplete;
