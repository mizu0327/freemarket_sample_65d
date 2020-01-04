class ImagesController < ApplicationController
  def new
    @image = Image.new
  end

  def create
    image = Image.create(image_params)
    redirect_to root_path
  end

  private
  def image_params
    params.require(:image).permit(:image)
  end

end