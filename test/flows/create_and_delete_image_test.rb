require 'flow_test_helper'

class CreateAndDeleteImageTest < FlowTestCase
  test 'create, view and delete image' do
    image = Image.new url: 'https://via.placeholder.com/728x90.png', tag_list: %w[tic toc]

    index_page = PageObjects::IndexPage.visit
    assert_predicate index_page.add_image, :present?
    refute_predicate index_page.notice, :present?

    image_form = index_page.add_new_image!
    assert image_form.is_a?(PageObjects::ImageForm)

    image_page = image_form.fill!(image)
    assert image_page.is_a?(PageObjects::ImagePage)

    index_page = image_page.delete!
    assert index_page.is_a?(PageObjects::IndexPage)
    assert_predicate index_page.notice, :present?
    assert_match(/^Deleted image [0-9]+$/, index_page.notice.text)
  end
end
