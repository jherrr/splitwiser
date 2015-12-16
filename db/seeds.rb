# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Users = User.create([{username: 'Jeff', password: 'password', email: 'jeffher@gmail.com'},
                    {username: 'Collin', password: 'password', email: 'collinchen@gmail.com'},
                    {username: 'Byron', password: 'password', email: 'byronsha@gmail.com'},
                    {username: 'Mack', password: 'password', email: 'macksiu@gmail.com'},
                    {username: 'Hank', password: 'password', email: 'hankfanchiu@gmail.com'}])

Events = Event.create([{lender_id: 1, "kbbq", description: "Some kbbq place", dollar_amt: 7000},
                      {lender_id: 1, "tofu house", description: "Some tofuhouse place", dollar_amt: 6000},
                      {lender_id: 4, "burgers", description: "Pearl's Burgers", dollar_amt: 3000},
                      {lender_id: 2, "pho", description: "Turtle Pho House", dollar_amt: 5000},
                      {lender_id: 3, "salad", description: "Bristol Farms", dollar_amt: 10000}
                      ]);
