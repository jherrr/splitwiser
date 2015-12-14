# Phase 2: More Flux Architecture and Transaction Event Join CRUD (1 days)

## Rails
### Models

### Controllers

### Views
* transaction_event_joins/index.json.jbuilder
( - React Components)
* splitOptionForm
* splitOptionIndex
* splitOptionItems
* transactionJoinIndex
* transactionJoinItem

### Actions
* ApiActions.receiveAllTransactionEventJoins -> triggered by ApiUtil
* ApiActions.deleteTransactionEventJoin
* NoteActions.fetchAllTransactionEventJoins -> triggers ApiUtil
* NoteActions.createTransactionEventJoin
* NoteActions.editTransactionEventJoin
* NoteActions.destroyTransactionEventJoin

### ApiUtil
* ApiUtil.fetchAllTransactionEventJoins
* ApiUtil.createTransactionEventJoin
* ApiUtil.editTransactionEventJoin
* ApiUtil.destroyTransactionEventJoin

## Gems/Libraries
