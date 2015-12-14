# Splitwiser (Name Pending)

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: https://splitwiser.herokuapp.com/

## Minimum Viable Product

Splitwiser (name pending) is a web application based on Splitwise built using Ruby on Rails and React.js Splitwiser allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->
- [ ] Add a bill; bill features include:
- [ ]	adding the user’s associates via email or username to a list to be included in the bill
  	- [ ] a description of the bill
  	- [ ] the bill total
  	- [ ] ways to split the bill including: splitting the bill equally, by exact  amounts, by percentage
  	- [ ] 	by shares, by adjustment, by reimbursement, and by an itemized bill.
  	adding images or notes
  	- [ ] the date
  	- [ ] a group for shared history.
- [ ] A tab to see a list of recent transactions
- [ ] A tab to see all pending transactions
- [ ] A group tab to see all activity grouped together for a related purpose.
- [ ] A functionality to settle what the user owes.

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Flux Architecture and Transaction Event CRUD (1 day)

In Phase 1, I will begin by setting up Flux, the React Router, and the React view
structure for the main application. There will be a basic landing page after signup
that will contain the container for the application's root React component.
This day will be basically guessing and testing each part of the pattern to get
the retrieval and creation of new transaction events going. The transaction events
and users tables will be set up first to ensure data persistence. I will also set
up the transaction events store. At this stage, I want to be able to create new
events from the console and have it displayed on the index page as React components.

[Details][phase-one]

### Phase 2: More Flux Architecture and Transaction Event Join CRUD (1 day)

In Phase 2, I will be implementing the transaction join table CRUD. The join
table models how much each user owes a particular user for a particular transaction event
this will be more frontend application logic heavy as the amount owed can be calculated
differently, based on the split options chosen. Each option is also a react component,
so this stage will need a lot of testing. I will be creating a React component for
these join table entries that should show up as indexed items when a particular
transaction event is selected.

[Details][phase-two]

### Phase 3: Build out Settle Up Functionality, Uploaded Image and Add Notes Functionality (1 day)

In phase 3, I will build out the Settle Up functionality. First I'll migrate the table,
then create the model and the controller. This functionality will grab all the rows
from the transaction events join table with the particular user foreign key and calculate
how much the user owes to each specific other user. After the user coughs up the dough by
settling up, an action should be sent that updates all pending debts for the user
in the transaction events join table. If a particular event has been all settled up
by various users, an action should be sent to update the status of the event in the
table to "settled".

### Phase 4: Groups and Groupings (Tags and Tagging) (2 days)

Phase 4 adds organization to the transactions and transaction events. Transactions
and transaction events belong to a group, which has its own `Show` view. I will
create JSON API for Groups. Transactions and transaction events can only be tagged
by one group. By selecting the group index on the side bar, a particular group's
transactions will be shown.

[Details][phase-four]

### Phase 5: User Authentication (0.5 days)

In Phase 5, I will implement user signup and authentication (using BCrypt).

[Details][phase-five]


### Phase 6: Bootstrap and CSS (the rest of the days)

Bootstrap and css. Transitions. I'm not really sure what else at this point.

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
