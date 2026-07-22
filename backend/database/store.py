import json
import threading
from pathlib import Path


class DataStore:
    """Reads benchmark results from a JSON file.

    Re-reads the file on every call instead of caching, so editing
    data/benchmark_results.json takes effect immediately without a
    server restart. Swap this class for a real database later without
    touching the API layer.
    """

    def __init__(self, path: Path):
        self._path = Path(path)
        self._lock = threading.Lock()

    def _read(self):
        with self._lock:
            with open(self._path, "r", encoding="utf-8") as f:
                return json.load(f)

    def get_categories(self):
        return self._read().get("categories", [])

    def get_all_results(self):
        return self._read().get("results", {})

    def get_results(self, category_key):
        return self._read().get("results", {}).get(category_key)
