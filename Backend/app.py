from flask import Flask
from routes.auth import user_auth_bp
from routes.dashboard import dashboard_bp
from services.auth_service import AuthService

app=Flask(__name__)
app.config.from_object("config.Config")

app.register_blueprint(user_auth_bp) #connecting the blueprint to flask application. register_blueprint() attaches the blueprint(route organized into module) to our flask app.

app.register_blueprint(dashboard_bp) #connecting dashboard to flask application

@app.route("/")
def home():
    return{
        "message":"Welcome to CodeLens!",
        "status":"running",
        "version":"1.0"
    }
if __name__ == "__main__":
    app.run(debug=True)


