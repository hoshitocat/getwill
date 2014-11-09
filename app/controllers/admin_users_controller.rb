class AdminUsersController < ApplicationController
	layout 'admin', :only => [:index, :show, :apis]
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
		@post = Post.find_by(:id => params[:id])
  category = [1,3,5,7]
    current_quantity = [1000,5000,3000,8000]

    @graph = LazyHighCharts::HighChart.new('graph') do |f|
      f.title(text: 'ItemXXXの在庫の推移')
      f.xAxis(categories: category)
      f.series(name: '在庫数', data: current_quantity)
    end


		@chart = LazyHighCharts::HighChart.new('pie') do |f|
		f.chart({
			 defaultSeriesType: 'pie',
			 margin: [50, 200, 60, 170],
			 plotBackgroundColor: nil,
			 plotBorderWidth: nil,
			 plotShadow: false})
		f.plotOptions({
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		})
		f.series({
		  type: 'pie',
		  name: 'hoge',
		  data: [
			['10 ~ 20代', 10.0],
			['20 ~ 30代', 15.0],
			['30 ~ 40代', 20.0],
			['40 ~ 50代', 15.0]
		  ]
		})
	  end

	end

	def apis

	  xAxis_categories = ['平成20年', '平成21年', '平成22年', '平成23年', '平成24年']
      tickInterval     = 2
      data             = [691, 628, 693, 643, 659]
	  data2			   = [556, 599, 618, 641, 587]
      @graph_data = LazyHighCharts::HighChart.new('graph') do |f|
        f.title(text: '人口動態(自然増減)')
        f.xAxis(categories: xAxis_categories, tickInterval: tickInterval)
        f.series(name: '出生数', data: data, type: 'spline')
 		f.series(name: '死亡数', data: data2, type: 'spline')
      end





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
