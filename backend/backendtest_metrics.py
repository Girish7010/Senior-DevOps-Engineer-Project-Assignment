from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_metrics_shape():
    r = client.get("/metrics")
    assert r.status_code == 200
    data = r.json()
    for key in ["cpu", "latency_ms", "request_rate", "counter"]:
        assert key in data
