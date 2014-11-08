class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.text :image
      t.integer :age
      t.integer :sex
      t.string :post_code
      t.text :address
      t.integer :post_num
      t.integer :like_num
      t.integer :comment_num
      t.boolean :disability
      t.boolean :admin
      t.boolean :valiable

      t.timestamps
    end
  end
end
