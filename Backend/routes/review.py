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

@review_bp.route("", methods=["GET"]) # "" because the blueprint already has /reviews
@login_required
def get_reviews():
    user_id=g.user["user_id"]
    result= ReviewService.get_review(user_id)
    return jsonify(result)

@review_bp.route("/analyze/<int:review_id>", methods=["POST"])
@login_required
def analyze_file(review_id):
    result=ReviewService.analyze_file(review_id)
    return jsonify(result)

@review_bp.route("/github", methods=["POST"])
@login_required
def upload_repository():
    data= request.get_json()
    repo_url=data.get("repo_url")
    result = ReviewService.upload_repository(
        repo_url,
        g.user["user_id"]
    )
    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200