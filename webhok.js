const express = require('express');
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());

// Verify the Facebook webhook
app.get('/api', (req, res) => {
    verifyToken = "hey"
    console.log(req)
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

// Handle Facebook webhook events
app.post('/api', (req, res) => {
    const body = req.body;

    console.log('Received webhook event:', body);

    // Process the event data as needed

    res.status(200).send('EVENT_RECEIVED');
});
app.get('/1', (req, res) => {
    const page1HTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Page 1</title>
        </head>
        <body>
            <h1>This is Page 1</h1>
            <p>This is the content of Page 1.</p>
        </body>
        </html>
    `;
    res.send(page1HTML);
});

// Route to serve second inline HTML page
// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
