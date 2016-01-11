# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Users = User.create([{id: 1, username: 'Jeff', password: 'password', email: 'jeffher@gmail.com'},
                    {id: 2, username: 'Collin', password: 'password', email: 'collinchen@gmail.com'},
                    {id: 3, username: 'Byron', password: 'password', email: 'byronsha@gmail.com'},
                    {id: 4, username: 'Mack', password: 'password', email: 'macksiu@gmail.com'},
                    {id: 5, username: 'Hank', password: 'password', email: 'hankfanchiu@gmail.com'},
                    {id: 6, username: 'Dustin', password: 'password', email: 'dustinchen@gmail.com'}])

Events = Event.create([
  {
    id: 1,
    lender_id: 1,
    description: "Jin Mi Korean Restuarant",
    dollar_amt: 12000,
    settled: false,
    split_type: "equally",
    event_date: "11 Jan 2016"
  }, {
    id: 2,
    lender_id: 1,
    description: "Coco Bang",
    dollar_amt: 7000,
    settled: false,
    split_type: "equally",
    event_date: "06 Jan 2016"
  }, {
    id: 3,
    lender_id: 2,
    description: "Turtle House Pho",
    dollar_amt: 8000,
    settled: false,
    split_type: "equally",
    event_date: "01 Jan 2016"
  }, {
    id: 4,
    lender_id: 3,
    description: "Bristol Farms",
    dollar_amt: 12600,
    settled: false,
    split_type: "equally",
    event_date: "11 Jan 2016"
  }, {
    id: 5,
    lender_id: 4,
    description: "Pearl's Burgers",
    dollar_amt: 3200,
    settled: false,
    split_type: "equally",
    event_date: "09 Jan 2016"
  }
])

EventSplits = EventSplit.create([
  {
    id: 1,
    user_id: 1,
    dollar_amt: 2400,
    event_id: 129,
    amt_settled: 0,
    settled: false
  }, {
    id: 2,
    user_id: 2,
    dollar_amt: 2400,
    event_id: 129,
    amt_settled: 0,
    settled: false
  }, {
    id: 3,
    user_id: 3,
    dollar_amt: 2400,
    event_id: 129,
    amt_settled: 0,
    settled: false
  }, {
    id: 4,
    user_id: 4,
    dollar_amt: 2400,
    event_id: 129,
    amt_settled: 0,
    settled: false
  }, {
    id: 5,
    user_id: 5,
    dollar_amt: 2400,
    event_id: 129,
    amt_settled: 0,
    settled: false
  }, {
    id: 6,
    user_id: 1,
    dollar_amt: 1750,
    event_id: 130,
    amt_settled: 0,
    settled: false
  }, {
    id: 7,
    user_id: 2,
    dollar_amt: 1750,
    event_id: 130,
    amt_settled: 0,
    settled: false
  }, {
    id: 8,
    user_id: 3,
    dollar_amt: 1750,
    event_id: 130,
    amt_settled: 0,
    settled: false
  }, {
    id: 9,
    user_id: 5,
    dollar_amt: 1750,
    event_id: 130,
    amt_settled: 0,
    settled: false
  }, {
    id: 10,
    user_id: 1,
    dollar_amt: 1333,
    event_id: 131,
    amt_settled: 0,
    settled: false
  }, {
    id: 11,
    user_id: 2,
    dollar_amt: 1333,
    event_id: 131,
    amt_settled: 0,
    settled: false
  }, {
    id: 12,
    user_id: 3,
    dollar_amt: 1333,
    event_id: 131,
    amt_settled: 0,
    settled: false
  }, {
    id: 13,
    user_id: 4,
    dollar_amt: 1333,
    event_id: 131,
    amt_settled: 0,
    settled: false
  }, {
    id: 14,
    user_id: 5,
    dollar_amt: 1333,
    event_id: 131,
    amt_settled: 0,
    settled: false
  }, {
    id: 15,
    user_id: 6,
    dollar_amt: 1333,
    event_id: 131,
    amt_settled: 0,
    settled: false
  }, {
    id: 16,
    user_id: 1,
    dollar_amt: 2100,
    event_id: 132,
    amt_settled: 0,
    settled: false
  }, {
    id: 17,
    user_id: 2,
    dollar_amt: 2100,
    event_id: 132,
    amt_settled: 0,
    settled: false
  }, {
    id: 18,
    user_id: 3,
    dollar_amt: 2100,
    event_id: 132,
    amt_settled: 0,
    settled: false
  }, {
    id: 19,
    user_id: 4,
    dollar_amt: 2100,
    event_id: 132,
    amt_settled: 0,
    settled: false
  }, {
    id: 20,
    user_id: 5,
    dollar_amt: 2100,
    event_id: 132,
    amt_settled: 0,
    settled: false
  }, {
    id: 21,
    user_id: 6,
    dollar_amt: 2100,
    event_id: 132,
    amt_settled: 0,
    settled: false
  }, {
    id: 22,
    user_id: 1,
    dollar_amt: 1066,
    event_id: 133,
    amt_settled: 0,
    settled: false
  }, {
    id: 23,
    user_id: 4,
    dollar_amt: 1066,
    event_id: 133,
    amt_settled: 0,
    settled: false
  }, {
    id: 24,
    user_id: 6,
    dollar_amt: 1066,
    event_id: 133,
    amt_settled: 0,
    settled: false
}
])

Balances = Balance.create([
  {
    id: 1,
    current_user_id: 2,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 1333,
    amt_user_paid_back: 0,
    associate_id: 4
  }, {
    id: 2,
    current_user_id: 4,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 1333,
    amt_user_paid_back: 0,
    associate_id: 2
  }, {
    id: 3,
    current_user_id: 2,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 1333,
    amt_user_paid_back: 0,
    associate_id: 5
  }, {
    id: 4,
    current_user_id: 5,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 1333,
    amt_user_paid_back: 0,
    associate_id: 2
  }, {
    id: 5,
    current_user_id: 2,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 1333,
    amt_user_paid_back: 0,
    associate_id: 6
  }, {
    id: 6,
    current_user_id: 6,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 1333,
    amt_user_paid_back: 0,
    associate_id: 2
  }, {
    id: 7,
    current_user_id: 2,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 5483,
    amt_user_paid_back: 0,
    associate_id: 1
  }, {
    id: 8,
    current_user_id: 1,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 5483,
    amt_user_paid_back: 0,
    associate_id: 2
  }, {
    id: 9,
    current_user_id: 3,
    amt_user_is_owed: 10500,
    amt_user_is_paid_back: 0,
    amt_user_owes: 5483,
    amt_user_paid_back: 0,
    associate_id: 3
  }, {
    id: 10,
    current_user_id: 3,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 2100,
    amt_user_paid_back: 0,
    associate_id: 4
  }, {
    id: 11,
    current_user_id: 4,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 2100,
    amt_user_paid_back: 0,
    associate_id: 3
  }, {
    id: 12,
    current_user_id: 3,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 2100,
    amt_user_paid_back: 0,
    associate_id: 5
  }, {
    id: 13,
    current_user_id: 5,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 2100,
    amt_user_paid_back: 0,
    associate_id: 3
  }, {
    id: 14,
    current_user_id: 3,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 2100,
    amt_user_paid_back: 0,
    associate_id: 6
  }, {
    id: 15,
    current_user_id: 6,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 2100,
    amt_user_paid_back: 0,
    associate_id: 3
  }, {
    id: 16,
    current_user_id: 3,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 3433,
    amt_user_paid_back: 0,
    associate_id: 2
  }, {
    id: 17,
    current_user_id: 3,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 6250,
    amt_user_paid_back: 0,
    associate_id: 1
  }, {
    id: 18,
    current_user_id: 2,
    amt_user_is_owed: 6667,
    amt_user_is_paid_back: 0,
    amt_user_owes: 6250,
    amt_user_paid_back: 0,
    associate_id: 2
  }, {
    id: 19,
    current_user_id: 5,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 7583,
    amt_user_paid_back: 0,
    associate_id: 5
  }, {
    id: 20,
    current_user_id: 2,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 3433,
    amt_user_paid_back: 0,
    associate_id: 3
  }, {
    id: 21,
    current_user_id: 1,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 6250,
    amt_user_paid_back: 0,
    associate_id: 3
  }, {
    id: 22,
    current_user_id: 4,
    amt_user_is_owed: 2134,
    amt_user_is_paid_back: 0,
    amt_user_owes: 5833,
    amt_user_paid_back: 0,
    associate_id: 4
  }, {
    id: 23,
    current_user_id: 4,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 1066,
    amt_user_paid_back: 0,
    associate_id: 6
  }, {
    id: 24,
    current_user_id: 6,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 1066,
    amt_user_paid_back: 0,
    associate_id: 4
  }, {
    id: 25,
    current_user_id: 4,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 3466,
    amt_user_paid_back: 0,
    associate_id: 1
  }, {
    id: 26,
    current_user_id: 6,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 4499,
    amt_user_paid_back: 0,
    associate_id: 6
  }, {
    id: 27,
    current_user_id: 1,
    amt_user_is_owed: 14850,
    amt_user_is_paid_back: 0,
    amt_user_owes: 4499,
    amt_user_paid_back: 0,
    associate_id: 1
  }, {
    id: 28,
    current_user_id: 1,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 3466,
    amt_user_paid_back: 0,
    associate_id: 4
  }, {
    id: 29,
    current_user_id: 1,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 4150,
    amt_user_paid_back: 0,
    associate_id: 5
  }, {
    id: 30,
    current_user_id: 5,
    amt_user_is_owed: 0,
    amt_user_is_paid_back: 0,
    amt_user_owes: 4150,
    amt_user_paid_back: 0,
    associate_id: 1
  }
])

# Events = Event.create([{id: 1, lender_id: 1, description: "Some kbbq place", dollar_amt: 7000, split_type: "equally",
#                         event_date: "02 Oct 2015"},
#
#                       {id: 2, lender_id: 1, description: "Some tofuhouse place", dollar_amt: 6000, split_type: "equally",
#                          event_date: "11 Nov 2015"},
#
#                       {id: 3, lender_id: 4, description: "Pearl's Burgers", dollar_amt: 3000, split_type: "equally",
#                          event_date: "15 Dec 2015"},
#
#                       {id: 4, lender_id: 2, description: "Turtle Pho House", dollar_amt: 5000, split_type: "equally",
#                          event_date: "20 Dec 2015"},
#
#                       {id: 5, lender_id: 3, description: "Bristol Farms", dollar_amt: 10000, split_type: "equally",
#                          event_date: "13 Nov 2015"}
#                       ]);
#
# Event_splits = EventSplit.create([{user_id: 1, dollar_amt: 3500, event_id: 1},
#                             {user_id: 2, dollar_amt: 3500, event_id: 1},
#                             {user_id: 1, dollar_amt: 1500, event_id: 2},
#                             {user_id: 2, dollar_amt: 1500, event_id: 2},
#                             {user_id: 3, dollar_amt: 1500, event_id: 2},
#                             {user_id: 4, dollar_amt: 1500, event_id: 2},
#                             {user_id: 2, dollar_amt: 1000, event_id: 3},
#                             {user_id: 3, dollar_amt: 1000, event_id: 3},
#                             {user_id: 4, dollar_amt: 1000, event_id: 3},
#                             {user_id: 1, dollar_amt: 1000, event_id: 4},
#                             {user_id: 2, dollar_amt: 1000, event_id: 4},
#                             {user_id: 3, dollar_amt: 1000, event_id: 4},
#                             {user_id: 4, dollar_amt: 1000, event_id: 4},
#                             {user_id: 5, dollar_amt: 1000, event_id: 4},
#                             {user_id: 4, dollar_amt: 5000, event_id: 5},
#                             {user_id: 5, dollar_amt: 5000, event_id: 5}])
