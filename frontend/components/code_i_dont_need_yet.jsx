_eventsYouSponsored: function( events ) {
  var output = [];

  events.forEach( function(_event) {
    if ( _event.lender_id === window.user_id ) {
      output.push( _event );
    }
  });

  return output;
},
_amtPplPaidBack: function(events) {
  var sum = 0;
  var eventSplits =

  events.forEach()


},
_eventsChanged: function() {
  var eventsYouSponsored = this._eventsYouSponsored(EventStore.all());
  var sum = 0;

  eventsYouSponsored.forEach( function( _event ) {
    sum+= _event.dollar_amt
  })

  this.setState({amtYouAreOwed: sum, eventsYouSponsored: eventsYouSponsored});
},

_eventsYouSponsoredSplits: function(eventSplits) {
  var output = [];
  eventSplits.forEach( function(eventSplit) {
    if ( eventSplit.event.event_owner === this.props.user_id ) {
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
_splitsChanged: function () {
var eventsYouParticipatedSplits = EventSplitStore.userAll();
var eventsYouSponsoredSplits = this._eventsYouSponsoredSplits(EventSplitStore.all());

var balanceObj = this._calculateBalance(eventsYouParticipatedSplits, eventsYouSponsoredSplits);
this.setState(balanceObj);
},
