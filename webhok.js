const express = require('express');
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());

// Verify the Facebook webhook
app.get('/', (req, res) => {
  
  res.status(200).send('WEBHOOK_VERIFIED');
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
