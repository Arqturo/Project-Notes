echo "============================================"
echo "        NOTES APP - AUTO RUN SCRIPT"
echo "============================================"
echo ""

# =============================
# BACKEND
# =============================
echo "Starting backend..."
cd backend

if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi

npm run start:dev &

# =============================
# FRONTEND
# =============================
cd ../frontend

if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

npm run dev &

echo ""
echo "============================================"
echo "Backend:  http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo "============================================"
echo ""
