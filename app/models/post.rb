class Post < ActiveRecord::Base
<<<<<<< HEAD
	has_many :likes
=======
  mount_uploader :image, ImageUploader
>>>>>>> 8f79a8781e5cef71861da1d18014ebb8947f8bbf
end
