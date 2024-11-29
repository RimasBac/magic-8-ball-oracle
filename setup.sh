#!/bin/bash

echo "🎱 Setting up Magic 8 Ball Oracle project..."

# Clean existing dependencies
echo "🧹 Cleaning existing dependencies..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Success message
echo "✅ Setup complete! Run 'npm start' to begin development."
