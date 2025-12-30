#!/bin/bash

# Start the Node server in the background
node server.js &
SERVER_PID=$!

# Give the server a moment to start
sleep 2

# Open the browser
xdg-open http://localhost:5000 >/dev/null 2>&1

# Keep script alive until user stops it
echo "Server running. Press CTRL+C to stop."
wait $SERVER_PID
