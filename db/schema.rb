# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160208183737) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "balances", force: :cascade do |t|
    t.integer  "current_user_id",                   null: false
    t.integer  "amt_user_is_owed",      default: 0, null: false
    t.integer  "amt_user_is_paid_back", default: 0, null: false
    t.integer  "amt_user_owes",         default: 0, null: false
    t.integer  "amt_user_paid_back",    default: 0, null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.integer  "associate_id",                      null: false
  end

  add_index "balances", ["current_user_id", "associate_id"], name: "index_balances_on_current_user_id_and_associate_id", unique: true, using: :btree

  create_table "event_splits", force: :cascade do |t|
    t.integer  "user_id",                     null: false
    t.integer  "dollar_amt",                  null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "event_id",                    null: false
    t.integer  "amt_settled", default: 0,     null: false
    t.boolean  "settled",     default: false, null: false
  end

  add_index "event_splits", ["user_id"], name: "index_event_splits_on_user_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.integer  "lender_id",                   null: false
    t.text     "description",                 null: false
    t.integer  "dollar_amt",                  null: false
    t.boolean  "settled",     default: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "split_type"
    t.date     "event_date",                  null: false
  end

  add_index "events", ["lender_id"], name: "index_events_on_lender_id", using: :btree

  create_table "transactions", force: :cascade do |t|
    t.integer  "lender_id",   null: false
    t.integer  "borrower_id", null: false
    t.integer  "dollar_amt",  null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.date     "event_date",  null: false
  end

  add_index "transactions", ["borrower_id"], name: "index_transactions_on_borrower_id", using: :btree
  add_index "transactions", ["lender_id"], name: "index_transactions_on_lender_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
