import os
from pathlib import Path

from flask import Flask, jsonify
from flask_cors import CORS

from api import leaderboard_bp
from database import DataStore

BASE_DIR = Path(__file__).resolve().parent
DEFAULT_DATA_FILE = BASE_DIR.parent / "data" / "benchmark_results.json"
DATA_FILE = Path(os.environ.get("DATA_FILE", DEFAULT_DATA_FILE))


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["DATA_STORE"] = DataStore(DATA_FILE)

    app.register_blueprint(leaderboard_bp, url_prefix="/api")

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)
