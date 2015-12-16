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
                    {id: 5, username: 'Hank', password: 'password', email: 'hankfanchiu@gmail.com'}])

Events = Event.create([{id: 1, lender_id: 1, item: "kbbq", description: "Some kbbq place", dollar_amt: 7000, split_type: "equally"},
                      {id: 2, lender_id: 1, item: "tofu house", description: "Some tofuhouse place", dollar_amt: 6000, split_type: "equally"},
                      {id: 3, lender_id: 4, item: "burgers", description: "Pearl's Burgers", dollar_amt: 3000, split_type: "equally"},
                      {id: 4, lender_id: 2, item: "pho", description: "Turtle Pho House", dollar_amt: 5000, split_type: "equally"},
                      {id: 5, lender_id: 3, item: "salad", description: "Bristol Farms", dollar_amt: 10000, split_type: "equally"}
                      ]);

Event_splits = EventSplit.create([{user_id: 1, dollar_amt: 3500, event_id: 1},
                            {user_id: 2, dollar_amt: 3500, event_id: 1},
                            {user_id: 1, dollar_amt: 1500, event_id: 2},
                            {user_id: 2, dollar_amt: 1500, event_id: 2},
                            {user_id: 3, dollar_amt: 1500, event_id: 2},
                            {user_id: 4, dollar_amt: 1500, event_id: 2},
                            {user_id: 2, dollar_amt: 1000, event_id: 3},
                            {user_id: 3, dollar_amt: 1000, event_id: 3},
                            {user_id: 4, dollar_amt: 1000, event_id: 3},
                            {user_id: 1, dollar_amt: 1000, event_id: 4},
                            {user_id: 2, dollar_amt: 1000, event_id: 4},
                            {user_id: 3, dollar_amt: 1000, event_id: 4},
                            {user_id: 4, dollar_amt: 1000, event_id: 4},
                            {user_id: 5, dollar_amt: 1000, event_id: 4},
                            {user_id: 4, dollar_amt: 5000, event_id: 5},
                            {user_id: 5, dollar_amt: 5000, event_id: 5}])
