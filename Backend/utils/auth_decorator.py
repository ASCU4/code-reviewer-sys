#JWT Verification to avoid writing auth logic in every route
from functools import wraps
from flask import request, jsonify
from utils.jwt_handler import decode_token

# wraps preserves information about the original function.

#When someone calls: GET /dashboard, flask executes this:
def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("Decorator executed")
        auth_header= request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error":"Authorization token missing"}), 401 
        parts =auth_header.split()#extract token and split it, safer method in case somebody sends garbage like abc123, where index 1 doesn't exist
        if len(parts)!=2 or parts[0]!="Bearer":
            return jsonify({"error": "Invalid Authorization header"}), 401
        token= parts[1]
        payload=decode_token(token) #using utility to decode the token
        if payload is None: #if our token is Invlid then returns error
            return jsonify({"error":"Invalid Token"}), 401
        return func(*args, **kwargs) #JWT verified, now execute actual route

    return wrapper
#JWT Verification and login requirement
# Request arrives
#       ↓
# Extract Bearer token(Authorization header, extract token after that)
#       ↓
# Decode JWT
#       ↓
# Valid?
#    /     \
#  Yes      No
#  ↓         ↓
# Route    401