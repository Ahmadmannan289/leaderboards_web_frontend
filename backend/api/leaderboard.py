from flask import Blueprint, current_app, jsonify

leaderboard_bp = Blueprint("leaderboard", __name__)


def _store():
    return current_app.config["DATA_STORE"]


@leaderboard_bp.get("/categories")
def get_categories():
    return jsonify(_store().get_categories())


@leaderboard_bp.get("/leaderboard")
def get_all_leaderboards():
    return jsonify(_store().get_all_results())


@leaderboard_bp.get("/leaderboard/<category_key>")
def get_leaderboard(category_key):
    results = _store().get_results(category_key)
    if results is None:
        return jsonify({"error": f"Unknown category '{category_key}'"}), 404
    return jsonify(results)
