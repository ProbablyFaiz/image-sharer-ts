class ImagesController < ApplicationController
  protect_from_forgery with: :exception

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid do
    render status: 400
  end

  def create
    @image = Image.new(image_params)

    if @image.valid?
      @image.save!
      flash[:notice] = "Saved image #{@image.id}"
      redirect_to image_path @image.id
    else
      render action: :new, status: 422
    end
  end

  def index
    @images = Image.all.order created_at: :desc
  end

  def new
    @image = Image.new
  end

  def show
    @image = Image.find(params[:id])
  end

  private

  def not_found
    render file: "#{Rails.root}/public/404.html", layout: false, status: 404
  end

  def image_params
    params.require(:image).permit(:url)
  end
end
