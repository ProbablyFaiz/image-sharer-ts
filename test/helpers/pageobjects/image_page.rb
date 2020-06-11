module PageObjects
  class ImagePage < AePageObjects::Document
    element :image, locator: ['img']
    element :deletelink, locator: ['a', text: 'Delete this image']

    def delete
      deletelink.node.click
      yield node.driver.browser.switch_to.alert
    end

    def delete!
      delete(&:accept)
      window.change_to(IndexPage)
    end
  end
end
