class Post < ActiveRecord::Base
	has_many :likes
	# mount_uploader :image, ImageUploader
end
