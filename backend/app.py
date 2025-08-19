from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time
import logging
import threading

app = FastAPI(title="Metrics API", version="1.0.0")

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

counter = 0
lock = threading.Lock()

def tick_counter():
    global counter
    while True:
        time.sleep(1)
        with lock:
            counter += 1

threading.Thread(target=tick_counter, daemon=True).start()

class Metrics(BaseModel):
    cpu: float
    latency_ms: float
    request_rate: float
    counter: int

@app.get("/metrics", response_model=Metrics)
def get_metrics():
    cpu = max(0.0, min(100.0, random.gauss(42, 10)))
    latency_ms = max(1.0, random.gauss(120, 30))
    request_rate = max(0.0, random.gauss(75, 15))
    with lock:
        c = counter
    payload = {
        "cpu": round(cpu, 2),
        "latency_ms": round(latency_ms, 2),
        "request_rate": round(request_rate, 2),
        "counter": c
    }
    logging.info(f"/metrics -> {payload}")
    return payload

@app.get("/healthz")
def health():
    return {"status": "ok"}

@app.get("/readyz")
def ready():
    return {"status": "ready"}
