# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# coding: utf-8

User.create(:first_name => '理太',
            :last_name => '利己',
            :email => 'test@test',
            :password => 'test',
            :image => '',
            :age => 42,
            :sex => 1,
            :post_code => '916-8666',
            :address => '福井県鯖江市西山町13番1号',
            :post_num => 20,
            :like_num => 56,
            :comment_num => 17,
            :disability => true,
            :admin => false,
            :valiable => true)
User.create(:first_name => '理子',
            :last_name => '利己',
            :email => 'test@test',
            :password => 'test',
            :image => '',
            :age => 32,
            :sex => 2,
            :post_code => '916-8666',
            :address => '福井県鯖江市西山町',
            :post_num => 12,
            :like_num => 39,
            :comment_num => 33,
            :disability => false,
            :admin => false,
            :valiable => true)

Post.create(:title => 'テスト',
            :content => 'テストテストテストテストテストテストテストテストテストテスト',
            :image => '',
            :city_name => '鯖江市',
            :user_id => 1,
            :x_locate => 136.184474,
            :y_locate => 35.956553,
            :valiable => true,)
Post.create(:title => 'ほげほげ',
            :content => 'ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ',
            :image => '',
            :city_name => '鯖江市',
            :user_id => 1,
            :x_locate => 136.184474,
            :y_locate => 35.956553,
            :valiable => true,)
Post.create(:title => 'test',
            :content => '頑張りました。',
            :image => '',
            :city_name => '鯖江市',
            :user_id => 2,
            :x_locate => 136.184474,
            :y_locate => 35.956553,
            :valiable => true,)
