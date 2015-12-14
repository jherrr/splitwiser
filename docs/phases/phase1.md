# Phase 1: Flux Architecture and Transaction Event CRUD (1 day)

## Rails
### Models
* User
* Transaction Events

### Controllers
* UsersController
* Api::TransactionEventsController (create, destroy, index, show, update)

### Views
* transaction_events/index.json.jbuilder
(- React Views)
* transactionEventIndex
* transactionEventItem
* addBillForm
* transactionHeader

### Actions
* ApiActions.receiveAllTransactionEvents -> triggered by ApiUtil
* ApiActions.receiveSingleTransactionEvent
* ApiActions.deleteTransactionEvent
* NoteActions.fetchAllTransactionEvents -> triggers ApiUtil
* NoteActions.fetchSingleTransactionEvent
* NoteActions.createTransactionEvent
* NoteActions.editTransactionEvent
* NoteActions.destroyTransactionEvent

### ApiUtil
* ApiUtil.fetchAllTransactionEvents
* ApiUtil.fetchSingleTransactionEvent
* ApiUtil.createTransactionEvent
* ApiUtil.editTransactionEvent
* ApiUtil.destroyTransactionEvent

## Gems/Libraries
* Flux Dispatcher (npm)
