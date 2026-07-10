from flask import Blueprint, request, jsonify
from services.auth_service import AuthService
from extensions import limiter
#blueprint instance
user_auth_bp= Blueprint(
    "auth", __name__,
    url_prefix="/auth")

@user_auth_bp.route("/register", methods=["POST"])
def register():
    data= request.get_json()
    result= AuthService.register(data)
    return jsonify(result)

@user_auth_bp.route("/login", methods=["POST"])
def login():
    data=request.get_json()
    result=AuthService.login(data)
    return jsonify(result)

#google login
@user_auth_bp.route("/google", methods=["POST"])
def google_login():
    data= request.get_json()
    id_token= data.get("id_token")
    result= AuthService.google_login(id_token)
    if "error" in result:
        return jsonify(result), 401
    
    return jsonify(result), 200

#github login
@user_auth_bp.route("/github", methods=["POST"])
def github_login():
    code=request.json.get("code")
    result=AuthService.github_login(code)
    return jsonify(result)
# Register User
#     ↓
# Store Hashed Password
#     ↓
# Login
#     ↓
# Verify Password
#     ↓
# Generate JWT
# handles login in short
# POST /auth/register
# POST /auth/login

# Receive Request
# Parse JSON
# Call Service
# Return Response