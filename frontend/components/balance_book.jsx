var EventStore = require('../stores/event');
var TransactionStore = require('../stores/transaction');
var EventSplitStore = require('../stores/event_split');

var ApiUtil = require('../util/api_util');

var BalanceBook = React.createClass({
    _eventsYouSponsoredSplits: function(eventSplits) {
      var output = [];
      eventSplits.each( function(eventSplit) {
        if ( eventSplit.event.event_owner === window.user_id ) {
          output.push( eventSplit );
        }
      });

      return output;
    },
    _calculateBalance: function(theirSplits, yourSplits) {
      var money_you_owe = 0;

      theirSplits.forEach( function(split) {
        money_you_owe += split.dollar_amt;
      });

      var money_owed_you = 0;

      yourSplits.forEach( function(split) {
        money_owed_you += split.dollar_amt;
      });

      var balance = money_owed_you - money_you_owe;

      return {balance: balance, money_you_owe: money_you_owe, money_owed_you: money_owed_you};
    },

//everything below check it

  _splitsChanged: function () {
    var eventsYouParticipatedSplits = EventSplitStore.userAll();
    var eventsYouSponsoredSplits = _eventsYouSponsoredSplits(EventSplitStore.all());

    var balance = calculateBalance(eventsYouParticipatedSplits, eventsYouSponsoredSplits);
    this.setState({balance: balance});
  },
  getInitialState: function () {
    return {balance: 0, money_you_owe: 0, money_owed_you: 0};
  },
  componentDidMount: function () {
    this.splitListener = EventSplitStore.addListener(this._splitsChanged());
    ApiUtil.fetchUserSplits(window.user_id);
  },
  componentWillUnmount: function() {
    this.splitListener.remove();
  },
  render: function () {

    return {};
  }
});

module.exports = Balance;
