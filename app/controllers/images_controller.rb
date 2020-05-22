class ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)

    if @image.valid?
      @image.save!
      redirect_to @image
    else
      flash[:errors] = @image.errors
      redirect_to action: 'new', url: @image.url
    end
  end

  def index
    @images = Image.all
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
