module PageObjects
  class ImageForm < AePageObjects::Document
    path :new_image
    path :image

    form_for :image do
      element :url
      element :tag_list
    end

    def fill!(img)
      image.url.set(img.url)
      image.tag_list.set(img.tag_list.join(','))
      image.node.click_on 'Create Image'
      window.change_to(ImagePage)
    end
  end
end
