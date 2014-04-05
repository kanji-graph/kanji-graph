class CreateSurnames < ActiveRecord::Migration
  def change
    create_table :surnames do |t|
      t.string :name

      t.timestamps
    end
  end
end
