### Phase 3: Build out Settle Up Functionality, Uploaded Image and Add Notes Functionality (1 day)
## Rails
### Models

### Controllers

### Views
* transaction/index.json.jbuilder
( - React Components)
* settleUpForm
* transactionIndex
* transactionItems

### Actions
* ApiActions.receiveAllTransaction -> triggered by ApiUtil
* ApiActions.deleteTransaction
* NoteActions.fetchAllTransaction -> triggers ApiUtil
* NoteActions.createTransaction
* NoteActions.editTransaction
* NoteActions.destroyTransaction

### ApiUtil
* ApiUtil.fetchAllTransaction
* ApiUtil.createTransaction
* ApiUtil.editTransaction
* ApiUtil.destroyTransaction
