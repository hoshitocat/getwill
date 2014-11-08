class AdminUsersController < ApplicationController
	layout 'admin', :only => [:index, :show]
	def index
		session[:admin_user] = 1
		if session[:admin_user] != nil
			# search post by encoded city_name but data is 
			# @likes = Post.joins("LEFT OUTER JOIN `likes` ON `likes`.`post_id` = `posts`.`id`")
			@posts = Post.all
			
			@posts.each do |post|
				str = post.id.to_s
				@li = ActiveRecord::Base.connection.select("SELECT likes.* FROM likes LEFT OUTER JOIN posts ON likes.post_id = posts.id where post_id = " + str)
				@comment = ActiveRecord::Base.connection.select("SELECT comments.* FROM comments LEFT OUTER JOIN posts ON comments.post_id = posts.id where post_id = " + str)
	
				post.image = get_size(@li)
				post.city_name = get_size(@comment)
			end
		else 
		
		end
	end

	def show

	end

	def login 
		
	end
	private
		def get_size(array)
			num = 0;
			array.each do |post|
				num += 1;
			end
			return num
		end
end
