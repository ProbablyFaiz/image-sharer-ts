module PageObjects
  class IndexPage < AePageObjects::Document
    path :root

    element :add_image, locator: ['a', text: 'Add image']
    element :notice, locator: ['p.notice']

    def add_new_image!
      add_image.node.click
      window.change_to(ImageForm)
    end
  end
end
