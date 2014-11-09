class CreateSabaePs < ActiveRecord::Migration
  def change
    create_table :sabae_ps do |t|
      t.integer :no
      t.integer :year
      t.integer :age
      t.integer :man
      t.integer :fem

      t.timestamps
    end
  end
end
