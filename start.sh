#! /usr/bin/env sh

# Define the application directory
APP_DIR="/data/app/reviewniverse/alpha"

# Navigate to the application directory
cd $APP_DIR

# Start the application
echo "Starting the application..."
nohup yarn start &

echo "Application started."