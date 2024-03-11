import { Express } from "express";
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());

// Verify the Facebook webhook
app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === 'hello') {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
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
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
