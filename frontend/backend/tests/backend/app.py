"""Simple metrics API for the Monitoring Dashboard."""
from flask import Flask, jsonify
import random
import time


class MetricsService:
    def __init__(self) -> None:
        self.counter = 0

    def get_metrics(self) -> dict:
        self.counter += 1
        return {
            "cpu": round(random.uniform(5, 80), 1),
            "latency_ms": random.randint(20, 120),
            "memory_mb": random.randint(100, 500),
            "counter": self.counter,
            "timestamp": int(time.time()),
        }


def create_app() -> Flask:
    app = Flask(__name__)
    service = MetricsService()

    @app.get("/metrics")
    def metrics():
        payload = service.get_metrics()
        return jsonify(payload)

    @app.get("/")
    def root():
        return jsonify(
            {
                "status": "ok",
                "message": "Monitoring Dashboard backend is running",
            }
        )

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8000)
