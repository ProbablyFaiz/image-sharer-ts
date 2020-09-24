module Api
  class CommentsController < ApplicationController
    skip_before_action :verify_authenticity_token

    before_action :set_default_response_format

    rescue_from ActionController::ParameterMissing do |e|
      render json: e.message.to_json, status: 400
    end

    def create
      @comment = Comment.new(comment_params)

      if @comment.valid?
        @comment.save!
        render body: nil, status: 204
      else
        render body: nil, status: 500
      end
    end

    def index
      comments = if params[:image_id].present?
                   Comment.where(image_id: params[:image_id])
                 else
                   Comment.all
                 end

      render json: comments
    end

    def comment_params
      { text: params.require(:text), image_id: params.require(:image_id) }
    end

    def set_default_response_format
      request.format = :json
    end
  end
end

