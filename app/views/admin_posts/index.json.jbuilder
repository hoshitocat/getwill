json.array!(@admin_posts) do |admin_post|
  json.extract! admin_post, :id, :title, :content, :image, :user_id, :deadline, :valiable
  json.url admin_post_url(admin_post, format: :json)
end
