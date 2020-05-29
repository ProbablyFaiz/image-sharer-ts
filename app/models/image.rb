require 'uri'
class Image < ApplicationRecord
  validates :url, url: { schemes: %w[http https] }
end
