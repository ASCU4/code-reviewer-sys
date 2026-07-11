import jwt
from flask import current_app #current_app is a Flask-provided proxy object.
from datetime import datetime, timedelta, timezone

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
        print(payload)
        return payload
    
    except jwt.ExpiredSignatureError:
        return None

    except jwt.InvalidTokenError:
        return None
    
def create_token(user):
    payload={
        "user_id": user.user_id,
        "email": user.email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24)
        }
    print(payload)
    token=jwt.encode(
        payload,
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )
    return token