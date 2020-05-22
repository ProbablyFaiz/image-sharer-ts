class ImagesController < ApplicationController
  protect_from_forgery with: :exception

  def create
    @image = Image.new(image_params)

    if @image.valid?
      @image.save!
      flash[:notice] = "Saved image #{@image.id}"
      redirect_to image_path @image.id
    else
      flash[:errors] = @image.errors
      redirect_to action: 'new', url: @image.url
    end
  end

  def index
    @images = Image.all.order created_at: :desc
  end

  def new
    @errors = flash[:errors] || {}
  end

  def show
    @image = Image.find(params[:id])
  end

  private

  def image_params
    params.require(:image).permit(:url)
  end
end
