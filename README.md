# Monitoring Dashboard

A real-time monitoring dashboard application that displays system metrics with interactive charts. The project consists of a FastAPI backend that generates simulated metrics and a React frontend that visualizes the data using Chart.js.

## 🏗️ Architecture

The application follows a microservices architecture with the following components:

- **Backend**: FastAPI service that generates and serves metrics data
- **Frontend**: React application with Chart.js for data visualization
- **Containerization**: Docker containers for both services
- **Orchestration**: Kubernetes manifests for deployment
- **Local Development**: Docker Compose for easy local setup

## 📊 Features

- Real-time metrics polling (every 10 seconds)
- Interactive line charts for CPU, latency, and request rate
- Live counter display
- Responsive dashboard layout
- Health check endpoints
- Containerized deployment
- Kubernetes support

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Python 3.12+ (for local development)

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd Project-Assignment
```

2. Start the services:
```bash
docker-compose up --build
```

3. Access the application:
- Frontend: http://localhost:8081
- Backend API: http://localhost:8080

### Local Development

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend:
```bash
uvicorn app:app --host 0.0.0.0 --port 8080 --reload
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Access the frontend at http://localhost:5173

## 🐳 Docker

### Building Images

```bash
# Build backend
docker build -t metrics-backend:latest ./backend

# Build frontend
docker build -t metrics-frontend:latest ./frontend
```

### Running Containers

```bash
# Run backend
docker run -p 8080:8080 metrics-backend:latest

# Run frontend
docker run -p 8081:80 metrics-frontend:latest
```

## ☸️ Kubernetes Deployment

### Prerequisites

- Minikube or a Kubernetes cluster
- kubectl configured

### Deploy to Kubernetes

1. Create the namespace:
```bash
kubectl apply -f k8s/k8s.yaml
```

2. Deploy the backend:
```bash
kubectl apply -f k8s/k8s.backend-svc.yaml
```

3. Deploy the frontend:
```bash
kubectl apply -f k8s/k8s.frontend-deploy.yaml
kubectl apply -f k8s/k8s.frontend-svc.yaml
kubectl apply -f k8s/k8s.frontend-nginx-configmap.yaml
```

4. Access the application:
```bash
# Get the frontend service URL
kubectl get svc -n monitoring-dashboard

# Port forward if needed
kubectl port-forward svc/frontend-service 8081:80 -n monitoring-dashboard
```

## 📡 API Endpoints

### Backend API (Port 8080)

- `GET /metrics` - Returns current metrics data
  ```json
  {
    "cpu": 45.23,
    "latency_ms": 125.67,
    "request_rate": 78.45,
    "counter": 1234
  }
  ```

- `GET /healthz` - Health check endpoint
- `GET /readyz` - Readiness check endpoint

### Frontend (Port 8081)

- Main dashboard interface
- Real-time metrics visualization
- Interactive charts

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Threading** - Background counter service

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Chart.js** - Charting library
- **react-chartjs-2** - React wrapper for Chart.js

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Kubernetes** - Container orchestration
- **Nginx** - Web server (frontend)
- **Minikube** - Local Kubernetes cluster

## 📁 Project Structure

```
Project-Assignment/
├── backend/
│   ├── app.py                 # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile            # Backend container
│   └── backendtest_metrics.py # Test file
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   └── main.jsx          # React entry point
│   ├── package.json          # Node.js dependencies
│   ├── Dockerfile            # Frontend container
│   ├── nginx.compose.conf    # Nginx configuration
│   └── vite.config.js        # Vite configuration
├── k8s/                      # Kubernetes manifests
│   ├── k8s.yaml              # Namespace
│   ├── k8s.backend-svc.yaml  # Backend service
│   ├── k8s.frontend-deploy.yaml # Frontend deployment
│   └── k8s.frontend-svc.yaml # Frontend service
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # This file
```

## 🔧 Configuration

### Environment Variables

- `VITE_API_BASE` - Backend API base URL (default: http://localhost:8080)
- `POLL_MS` - Metrics polling interval in milliseconds (default: 10000)

### Customization

- Modify `backend/app.py` to change metrics generation logic
- Update `frontend/src/App.jsx` to modify dashboard layout and charts
- Adjust `docker-compose.yml` for different port mappings
- Customize Kubernetes manifests in the `k8s/` directory

## 🧪 Testing

### Backend Testing

```bash
cd backend
python backendtest_metrics.py
```

### Frontend Testing

```bash
cd frontend
npm run preview  # Preview production build
```

## 📈 Monitoring

The application includes built-in monitoring capabilities:

- Real-time metrics visualization
- Historical data tracking (last 30 data points)
- Health check endpoints for container orchestration
- Structured logging for debugging



