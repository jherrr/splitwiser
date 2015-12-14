# Phase 4: Allow Complex Styling in Notes (1 day)

## Rails
### Models
Group
Grouping

### Controllers
Api::GroupsController (create, destroy, index, show, update)

### Views
groups/index.json.jbuilder
groups/show.json.jbuilder
groupings/show.json.jbuilder

## Flux
### Views (React Components)
groupsIndex
  groupsIndexItem
groupsForm

### Stores
Group

### Actions
* ApiActions.receiveAllGroups -> triggered by ApiUtil
* ApiActions.receiveSingleGroup
* ApiActions.deleteGroup
* NoteActions.fetchAllGroup -> triggers ApiUtil
* NoteActions.createGroup
* NoteActions.editGroup
* NoteActions.destroyGroup

### ApiUtil
* ApiUtil.fetchAllGroups
* ApiUtil.fetchSingleGroup
* ApiUtil.createGroup
* ApiUtil.editGroup
* ApiUtil.destroyGroup
