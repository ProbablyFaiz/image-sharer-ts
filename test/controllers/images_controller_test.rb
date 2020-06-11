require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest # rubocop:disable Metrics/ClassLength
  test 'The landing page links to the image link submission form' do
    get images_path
    assert_response :success

    assert_select 'a[href]', 1
    assert_select 'a[href]' do |elements|
      assert_equal new_image_path, elements[0].attr(:href)
    end
  end

  test 'The landing page has a message when there are no images' do
    get images_path
    assert_response :success

    assert_select 'p', 'There are no images'
  end

  test 'I can view an individual image' do
    image = Image.create! url: 'https://images.examples.com/one.jpg', created_at: Time.now

    get image_path image.id
    assert_response :success

    assert_select 'img[src]', 1
    assert_select 'img[src]' do |elements|
      assert_equal image.url, elements[0].attr(:src)
    end
  end

  test 'I can view the tags of an individual image' do
    image = Image.create! url: 'https://images.examples.com/one.jpg', tag_list: %w[bar baz],
                          created_at: Time.now

    get image_path image.id
    assert_response :success

    assert_select '.tag_list a', 2
    assert_select '.tag_list a[href=?]', root_path(params: { tag: :bar })
    assert_select '.tag_list a[href=?]', root_path(params: { tag: :baz })
  end

  test 'I get a 404 trying to view an individual image that does not exist' do
    get image_path(-1)

    assert_response :missing
  end

  test 'When I click on a tag, I see a filtered list of only the images that have the tag I clicked on.' do
    bar_image = Image.create! url: 'https://images.examples.com/bar.jpg', tag_list: %w[bar]
    baz_image = Image.create! url: 'https://images.examples.com/baz.jpg', tag_list: %w[baz]

    get images_path params: { tag: :bar }
    assert_response :success

    assert_select 'tr a[href=?]', image_path(baz_image), false

    assert_select 'tr img[src]', 1
    assert_select 'tr img[src=?]', bar_image.url
    assert_select 'tr a[href=?]', image_path(bar_image)
  end

  test 'When I search for a tag the page has a message when there are no matching images' do
    Image.create! url: 'https://images.examples.com/bar.jpg', tag_list: %w[bar]
    Image.create! url: 'https://images.examples.com/baz.jpg', tag_list: %w[baz]

    get images_path params: { tag: :foo }
    assert_response :success

    assert_select 'p', 'There are no images matching foo'
  end

  test 'Newest images appear first' do
    Image.create! url: 'https://images.examples.com/four.jpg', created_at: Time.now
    Image.create! url: 'https://images.examples.com/three.jpg', created_at: Time.now - 1.day

    get images_path
    assert_response :success

    assert_select 'tr img[src]', 2
    assert_select 'tr img[src]' do |elements|
      assert_equal 'https://images.examples.com/four.jpg', elements[0].attr(:src)
      assert_equal 'https://images.examples.com/three.jpg', elements[1].attr(:src)
    end
  end

  test 'images are persisted if the browser is closed or even if the server is restarted' do
    assert_difference 'Image.count' do
      post images_path,
           params: { image: { url: 'https://images.examples.com/three.jpg' } }
      assert_redirected_to Image.last
      follow_redirect!
      assert_response :success
    end

    assert_equal 'https://images.examples.com/three.jpg', Image.last.url
  end

  test 'A flash message is displayed indicating the image was created successfully' do
    post images_path,
         params: { image: { url: 'https://images.examples.com/three.jpg' } }

    assert_redirected_to Image.last
    follow_redirect!
    assert_match(/^Saved image [0-9]+$/, flash[:notice])
  end

  test 'I cannot successfully save an image with an invalid URL' do
    img = { url: 'ftp://foo.com' }
    assert_no_difference 'Image.count' do
      post images_path, params: { image: img }

      assert_response 422
      image = @controller.instance_variable_get :@image
      assert_equal ['is not a valid URL'], image.errors.messages[:url]
    end
  end

  test 'I can tag images' do
    assert_difference 'Image.count', 1 do
      assert_difference 'ActsAsTaggableOn::Tagging.count', 2 do
        post images_path,
             params: { image: { url: 'https://images.examples.com/three.jpg', tag_list: 'foo, bar' } }

        assert_redirected_to Image.last
        assert_equal %w[foo bar], Image.last.tag_list
      end
    end
  end

  test 'I can delete an image' do
    Image.create! url: 'https://images.examples.com/bar.jpg'

    assert_difference 'Image.count', -1 do
      delete image_path Image.last

      assert_redirected_to images_path
      assert_match(/^Deleted image [0-9]+$/, flash[:notice])
    end
  end

  test 'Deleting an image is idempotent' do
    Image.create! url: 'https://images.examples.com/bar.jpg'
    url = image_path Image.last

    delete url
    assert_redirected_to images_path
    delete url
    assert_redirected_to images_path
  end
end
