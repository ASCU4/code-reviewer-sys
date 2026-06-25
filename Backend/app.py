from flask import Flask
from flask_cors import CORS

from database.database import engine, Base
from models.user import User

from routes.auth import user_auth_bp
from routes.dashboard import dashboard_bp
from routes.review import review_bp
from services.auth_service import AuthService

app=Flask(__name__)

CORS(app, origins=["http://localhost:5173"]) #Cross origin resource sharing, enable backend to connect with frontend like in our React

app.config.from_object("config.Config")

app.register_blueprint(user_auth_bp) #connecting the blueprint to flask application. register_blueprint() attaches the blueprint(route organized into module) to our flask app.

app.register_blueprint(dashboard_bp) #connecting dashboard to flask application

app.register_blueprint(review_bp)

# Create all database tables
Base.metadata.create_all(bind=engine)

@app.route("/")
def home():
    return{
        "message":"Welcome to CodeLens!",
        "status":"running",
        "version":"1.0"
    }
if __name__ == "__main__":
    app.run(debug=True)


