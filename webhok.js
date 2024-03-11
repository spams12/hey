const express = require('express');
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());

// Verify the Facebook webhook
app.get('/', (req, res) => {
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
app.post('/', (req, res) => {
    const body = req.body;

    console.log('Received webhook event:', body);

    // Process the event data as needed

    res.status(200).send('EVENT_RECEIVED');
});

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
