from flask import Blueprint
from utils.auth_decorator import login_required

dashboard_bp= Blueprint(
    "dashboard",
    __name__,
    url_prefix="/dashboard"
)

@dashboard_bp.route("/", methods=['GET'])
@login_required
def dashboard():
    return{
        "message":"Dashboard Accessed"
    }