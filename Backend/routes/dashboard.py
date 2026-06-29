from flask import Blueprint, request, jsonify, g
from utils.auth_decorator import login_required
from services.dashboard_service import DashboardSerivce

dashboard_bp= Blueprint(
    "dashboard",
    __name__,
    url_prefix="/dashboard"
)

@dashboard_bp.route("/", methods=['GET'])
@login_required
def dashboard():
    user_id=g.user["user_id"]
    result= DashboardSerivce.get_dashboard(user_id)
    return jsonify(result), 200