#!/bin/bash

echo "Starting backend and frontend..."

# Start backend
echo "Launching FastAPI backend..."
cd backend
source venv/bin/activate
uvicorn server:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Start frontend
echo "Launching Angular frontend..."
cd frontend
ng serve &
FRONTEND_PID=$!
cd ..

# Wait for both to finish (they won’t unless killed)
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait