from flask import Blueprint, request, jsonify
from services.auth_service import AuthService

#blueprint instance
user_auth_bp= Blueprint(
    "auth", __name__, 
    url_prefix="/auth")

@user_auth_bp.route("/register", methods=["POST"])
def register():
    data= request.get_json()
    result= AuthService.register(data)
    return jsonify(result)

# handles login in short
# POST /auth/register
# POST /auth/login

# Receive Request
# Parse JSON
# Call Service
# Return Response