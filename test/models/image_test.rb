require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  test 'An image with an http URL is valid' do
    img = Image.new url: 'http://img.example.com'

    assert_predicate img, :valid?
  end

  test 'An image with an https URL is valid' do
    img = Image.new url: 'https://img.example.com'

    assert_predicate img, :valid?
  end

  test 'An image with an ftp URL is not valid' do
    img = Image.new url: 'ftp://img.example.com'

    refute_predicate img, :valid?
    assert_equal ['Must provide valid http(s) URL'], img.errors.messages[:url]
  end

  test 'An image without URL is not valid' do
    img = Image.new url: ''

    refute_predicate img, :valid?
    assert_equal ["can't be blank", 'Must provide valid http(s) URL'], img.errors.messages[:url]
  end
end
