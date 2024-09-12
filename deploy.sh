#! /usr/bin/env sh

# Define the application directory
APP_DIR="/data/app/reviewniverse/alpha"

# Navigate to the application directory
cd $APP_DIR

# Pull the latest changes from the 'alpha' branch
echo "Pulling latest changes from alpha branch..."
git pull origin alpha

# Install dependencies
echo "Installing dependencies..."
yarn install

# Build the application
echo "Building the application..."
yarn build

# Restart the application
echo "Restarting the application..."
./restart.sh

echo "Deployment complete."