from flask import Blueprint, request, jsonify, g

from utils.auth_decorator import login_required
from services.review_service import ReviewService


review_bp= Blueprint(
    "review",
    __name__,
    url_prefix="/reviews"
)

#POST review_upload endpoint/ API
@review_bp.route("/upload", methods=["POST"])
@login_required
def upload_review():
    data= request.get_json()

    user_id= g.user["user_id"]

    result= ReviewService.upload_review(
        data, user_id
    )
    return jsonify(result)

#GET reviews endpoint/API

@review_bp.route("", methods=["GET"])
@login_required
def get_reviews():
    user_id=g.user["user_id"]
    result= ReviewService.get_review(user_id)
    return jsonify(result)
