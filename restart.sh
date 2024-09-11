#! /usr/bin/env sh

# Define the application directory
APP_DIR="/data/app/reviewniverse/alpha"

# Navigate to the application directory
cd $APP_DIR

# Kill the process that is running the application (yarn start)
# Assuming it's running on the default port 3000, find and kill the process
PID=$(lsof -i :3000 -t)

if [ -n "$PID" ]; then
  echo "Stopping the running application with PID: $PID"
  kill -9 $PID
else
  echo "No application running on port 3000"
fi

# Wait for a moment to ensure the process has stopped
sleep 2

# Start the application again
echo "Starting the application..."
nohup yarn start &

echo "Application restarted."