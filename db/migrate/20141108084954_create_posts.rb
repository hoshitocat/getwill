class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.text :image
      t.integer :user_id
      t.float :x_locate
      t.float :y_locate
      t.boolean :valiable

      t.timestamps
    end
  end
end
