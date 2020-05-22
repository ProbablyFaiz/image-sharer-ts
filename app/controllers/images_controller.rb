class ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)

    if @image.valid?
      @image.save!
      redirect_to @image
    else
      flash[:error] = @image.errors.values.first
      redirect_to action: 'new', url: @image.url
    end
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
