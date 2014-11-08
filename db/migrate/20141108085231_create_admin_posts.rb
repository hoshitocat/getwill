class CreateAdminPosts < ActiveRecord::Migration
  def change
    create_table :admin_posts do |t|
      t.string :title
      t.text :content
      t.text :image
      t.integer :user_id
      t.datetime :deadline
      t.boolean :valiable

      t.timestamps
    end
  end
end
