const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Explicit CORS handling - this is the only CORS setup we need
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('OMI NAM Systems Online');
});

// Main analysis endpoint
app.post('/analyze', async (req, res) => {
  try {
    console.log('Received analysis request');
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Extract base64 data
    const base64Data = image.split(',')[1];
    if (!base64Data) {
      return res.status(400).json({ error: 'Invalid image format' });
    }

    console.log('Calling Google Vision API...');
    
    // Google Vision API call
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{
            image: { content: base64Data },
            features: [
              { type: 'OBJECT_DETECTION', maxResults: 10 },
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'TEXT_DETECTION', maxResults: 10 }
            ]
          }]
        })
      }
    );
    
    const visionData = await visionResponse.json();
    console.log('Google Vision response:', JSON.stringify(visionData, null, 2));
    
    if (visionData.error) {
      throw new Error(`Google Vision API error: ${visionData.error.message}`);
    }
    
    const objects = visionData.responses[0].localizedObjectAnnotations || [];
    const labels = visionData.responses[0].labelAnnotations
