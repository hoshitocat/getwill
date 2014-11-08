class CreateAdminUsers < ActiveRecord::Migration
  def change
    create_table :admin_users do |t|
      t.string :city_name
      t.string :email
      t.string :password
      t.text :image

      t.timestamps
    end
  end
end
