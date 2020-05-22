require 'test_helper'

class ApplicationControllerTest < ActionDispatch::IntegrationTest
  test 'the root URL returns 200 OK' do
    get '/'
    assert_equal 200, status
  end
end
