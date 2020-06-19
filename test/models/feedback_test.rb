require 'test_helper'

class FeedbackTest < ActiveSupport::TestCase
  test 'Feedback without comments is not valid' do
    feedback = Feedback.new username: 'me'

    refute_predicate feedback, :valid?
    assert_equal ["can't be blank"], feedback.errors.messages[:comments]
  end

  test 'Feedback without username is not valid' do
    feedback = Feedback.new comments: 'hi'

    refute_predicate feedback, :valid?
    assert_equal ["can't be blank"], feedback.errors.messages[:username]
  end

  test 'Feedback with username and comments is valid' do
    feedback = Feedback.new username: 'me', comments: 'hi'

    assert_predicate feedback, :valid?
  end
end
