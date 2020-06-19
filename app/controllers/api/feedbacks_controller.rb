module Api
  class FeedbacksController < ApplicationController
    protect_from_forgery with: :exception

    before_action :set_default_response_format

    rescue_from ActionController::ParameterMissing do |e|
      render json: e.message.to_json, status: 400
    end

    def create
      @feedback = Feedback.new(feedback_params)

      if @feedback.valid?
        @feedback.save!
        render body: nil, status: 204
      else
        render body: nil, status: 500
      end
    end

    def feedback_params
      { username: params.require(:username), comments: params.require(:comments) }
    end

    def set_default_response_format
      request.format = :json
    end
  end
end
