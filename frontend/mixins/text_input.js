
var TextInputMixin = {
  _textFocus: function ( ) {
    var keyVal = this.___getAttrAndKey( arguments );

    var newState = {textStyle: this.__textStyleFocus};
    newState[keyVal.key] = "";
    this.setState( newState );
  },
  _textBlur: function (  ) {
    var keyVal = this.___getAttrAndKey( arguments );

    if ( this.state.username === "" ) {
      var newState = {textStyle: this.__textStyleBlur};
      newState[keyVal.key] = keyVal.value;
      this.setState(newState);
    }
  },
  __textStyleFocus: {
    color: "black"
  },
  __textStyleBlur: {
    color: "#cccccc"
  },
  ___getAttrAndKey: function ( argData ) {
    var args = Array.prototype.slice.call(argData);
    var keyValue = args[0];
    var key = Object.keys(keyValue)[0];
    var value = keyValue[key];

    return {key: key, value: value};
  }
}

module.exports = TextInputMixin;
