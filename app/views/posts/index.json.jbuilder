json.array!(@posts) do |post|
  json.extract! post, :id, :title, :content, :image, :user_id, :x_locate, :y_locate, :valiable
  json.url post_url(post, format: :json)
end
