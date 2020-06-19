require 'test_helper'

module Api
  class FeedbacksControllerTest < ActionDispatch::IntegrationTest
    test 'feedback is persisted if the browser is closed or even if the server is restarted' do
      assert_difference 'Feedback.count' do
        post api_feedbacks_path, params: { username: 'user', comments: 'comment' }
        assert_response :no_content
      end

      assert_equal 'user', Feedback.last.username
      assert_equal 'comment', Feedback.last.comments
    end

    test 'invalid feedback is not persisted and the error message is returned as JSON' do
      assert_no_difference 'Feedback.count' do
        post api_feedbacks_path, params: { comments: 'comment' }
        assert_response 400
        assert_equal 'param is missing or the value is empty: username', JSON.parse(response.body)
      end
    end
  end
end
