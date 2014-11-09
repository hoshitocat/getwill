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

ActiveRecord::Schema.define(version: 20141109044250) do

  create_table "admin_posts", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.text     "image"
    t.integer  "user_id"
    t.datetime "deadline"
    t.boolean  "valiable"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "admin_users", force: true do |t|
    t.string   "city_name"
    t.string   "email"
    t.string   "password"
    t.text     "image"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comment_likes", force: true do |t|
    t.integer  "user_id"
    t.integer  "comment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: true do |t|
    t.text     "content"
    t.integer  "user_id"
    t.integer  "post_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "likes", force: true do |t|
    t.integer  "user_id"
    t.integer  "post_id"
    t.boolean  "valiable"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.text     "image"
    t.string   "city_name"
    t.integer  "user_id"
    t.float    "x_locate",   limit: 24
    t.float    "y_locate",   limit: 24
    t.boolean  "valiable"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sabae_ps", force: true do |t|
    t.integer  "no"
    t.integer  "year"
    t.integer  "age"
    t.integer  "man"
    t.integer  "fem"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password"
    t.text     "image"
    t.integer  "age"
    t.integer  "sex"
    t.string   "post_code"
    t.text     "address"
    t.integer  "post_num"
    t.integer  "like_num"
    t.integer  "comment_num"
    t.boolean  "disability"
    t.boolean  "admin"
    t.boolean  "valiable"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
