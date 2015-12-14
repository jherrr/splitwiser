# Schema Information

## transactions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
lender_id   | integer   | not null, foreign key (references users), indexed
borrower_id | integer   | not null, foreign key (references users), indexed
dollar_amt  | integer   | not null
date_created| date      | not null
date_updated| date      | not null

## transaction_events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
lender_id   | integer   | not null, foreign key (references users), indexed
item        | string    | not null
description | text      | not null
dollar_amt  | integer   | not null
date_created| date      | not null
date_updated| date      | not null
settled     | boolean   | not null, default false;

## transaction_events_join_table
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
event_id    | integer   | not null, foreign key (references transaction_events),
            |           | indexed
user_id     | integer   | not null, foreign key (references users), indexed
dollar_amt  | integer   | not null
settled     | boolean   | not null, default false
date_created| date      | not null
date_updated| date      | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
email           | string    |

## notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
event_id    | integer   | not null, foreign key (references transaction_events),
            |           | indexed
note_id     | string    | not null, foreign key (references notes), indexed
date_created| date      | not null
date_updated| date      | not null
img_url     | string    |

## groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## event_groupings (taggings)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
event_id    | integer   | not null, foreign key (references transaction_events),
            |           | indexed, unique [group_id]
group_id    | integer   | not null, foreign key (references group), indexed

## transaction_groupings (taggings)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
trans_id    | integer   | not null, foreign key (references transaction),
            |           | indexed, unique [group_id]
group_id    | integer   | not null, foreign key (references group), indexed
