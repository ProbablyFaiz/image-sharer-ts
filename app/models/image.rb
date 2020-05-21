require 'uri'

class ImageValidator < ActiveModel::Validator
  def validate(record)
    uri = URI(record.url)
    record.errors[:url] << 'Must provide valid http(s) URL' unless %w[http https].include? uri.scheme
  end
end

class Image < ApplicationRecord
  validates :url, presence: { strict: false }
  validates_with ImageValidator
end
