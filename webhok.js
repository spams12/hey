// Server (app.js)
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let postRequestCount = 0; // Counter for POST requests

// Serve the HTML page
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>POST Request Count</title>
    </head>
    <body>
      <h1>Number of POST requests: <span id="postRequestCount">0</span></h1>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io();
        socket.on('postRequestCountUpdate', (count) => {
          document.getElementById('postRequestCount').textContent = count;
        });
      </script>
    </body>
    </html>
  `);
});

// Endpoint to update content
app.post('/update', (req, res) => {
    postRequestCount++; // Increment the counter
    io.emit('postRequestCountUpdate', postRequestCount); // Broadcast the updated post request count
    res.end('Content updated successfully');
});
app.get('/update', (req, res) => {
    verifyToken = "hey";
    console.log(req.body);
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === verifyToken) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A client connected');
    // Send the initial post request count to the new client
    socket.emit('postRequestCountUpdate', postRequestCount);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
