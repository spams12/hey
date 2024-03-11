// Server (app.js)
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let currentContent = ''; // Current content of the HTML page

// Serve the HTML page
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dynamic Content</title>
    </head>
    <body>
      <div id="content">${currentContent}</div>
      <div id="logs"></div>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io();
        // Listen for content updates from the server
        socket.on('contentUpdated', (newContent) => {
          document.getElementById('content').innerHTML = newContent;
        });
        // Listen for logs from the server
        socket.on('log', (message) => {
          const logElement = document.createElement('div');
          logElement.textContent = message;
          document.getElementById('logs').appendChild(logElement);
        });
      </script>
    </body>
    </html>
  `);
});

// Endpoint to update content
app.post('/update', (req, res) => {
    let newContent = ''; // Get new content from request body
    req.on('data', chunk => {
        newContent += chunk;
    });

    req.on('end', () => {
        currentContent = newContent;
        io.emit('contentUpdated', newContent); // Broadcast the new content to all clients
        res.end('Content updated successfully');
    });
});

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A client connected');
    // Send the current content to the new client
    socket.emit('contentUpdated', currentContent);
    // Log to all clients when a client connects
    io.emit('log', 'A client connected');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
