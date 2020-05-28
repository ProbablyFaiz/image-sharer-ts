require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  test 'The landing page links to the image link submission form' do
    get images_path
    assert_response :success

    assert_select 'a[href]', 1
    assert_select 'a[href]' do |elements|
      assert_equal new_image_path, elements[0].attr(:href)
    end
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

  test 'I get a 404 trying to view an individual image that does not exist' do
    get image_path(-1)

    assert_response :missing
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
      post images_path,
           params: { image: img }

      assert_response 422
      image = @controller.instance_variable_get :@image
      assert_equal ['is not a valid URL'], image.errors.messages[:url]
    end
  end
end
