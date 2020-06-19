class Feedback < ApplicationRecord
  validates :comments, presence: true
  validates :username, presence: true
end
