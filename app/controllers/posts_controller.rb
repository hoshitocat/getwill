# coding: utf-8
class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  skip_before_filter :verify_authenticity_token

  # GET /posts
  # GET /posts.json
  def index
    gon.controller = params[:controller]
    gon.action = params[:action]
    @user = User.find(1)
    @posts = Post.all.order(created_at: :desc)
    session[:user_id] = @user.id
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  def like
    post_id = params[:post_id]
    if like_done = Like.where(post_id: post_id, user_id: session[:user_id]).first
      if like_done.valiable
        like_done.update_attribute(:valiable, false)
        @done = true
      else
        like_done.update_attribute(:valiable, true)
        @done = false
      end
    else
      like = Like.new
      like.user_id = session[:user_id]
      like.post_id = post_id
      like.valiable = true
      like.save
      @done = false
    end
    redirect_to '/posts'
  end

  def comment
    post_id = 3 # params[:post_id]
    comment = Comment.new
    comment.content = "これすごく良くわかります。よろしくお願い致します。"# params[:comment]
    comment.user_id = session[:user_id]
    comment.post_id = post_id
    comment.save
    redirect_to '/posts'
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to '/posts', notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :content, :image, :user_id, :x_locate, :y_locate, :valiable)
    end
end
