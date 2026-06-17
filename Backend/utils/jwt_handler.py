import jwt 
from flask import current_app #current_app is a Flask-provided proxy object.

#decoding a token, take token->verify signature->extract payload->return data
#could be added as another function in AuthService as decode_token() but if logic needed to be changed, we might have to change it everywhere, so only one place here
#decoding a token is a generic utility

def decode_token(token):
    try:
        payload=jwt.decode(
            token, 
            current_app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )
        return payload
    
    except jwt.InvalidTokenError:
        return None