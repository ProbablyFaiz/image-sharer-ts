class ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)

    @image.save
    redirect_to @image
  end

  def index
    @images = Image.all
  end

  def new; end

  def show
    @image = Image.find(params[:id])
  end

  private

  def image_params
    params.require(:image).permit(:url)
  end
end
