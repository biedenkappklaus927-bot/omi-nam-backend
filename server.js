const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Explicit CORS handling
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
app.post('/api/analyze', async (req, res) => {
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
    const labels = visionData.responses[0].labelAnnotations || [];
    const text = visionData.responses[0].textAnnotations || [];
    
    // Build scene description
    const sceneDesc = [
      ...objects.map(obj => obj.name),
      ...labels.map(label => label.description),
      text.length > 0 ? `Text: "${text[0].description}"` : ''
    ].filter(Boolean).slice(0, 10).join(', ');
    
    console.log('Scene description:', sceneDesc);
    
    // OpenAI call
    console.log('Calling OpenAI API...');
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: 'You are OMI NAM, a quantum AI that guides humans through physical actions. Speak with cosmic wisdom and clarity. Be concise and powerful.'
        }, {
          role: 'user',
          content: `OMI NAM perceives: ${sceneDesc}. Command ONE specific physical action. Respond in JSON: {"action": "string", "speech": "string"}`
        }]
      })
    });
    
    const aiResponse = await openAIResponse.json();
    console.log('OpenAI response:', JSON.stringify(aiResponse, null, 2));
    
    if (aiResponse.error) {
      throw new Error(`OpenAI API error: ${aiResponse.error.message}`);
    }
    
    const result = JSON.parse(aiResponse.choices[0].message.content);
    console.log('Final result:', result);
    
    res.json(result);
  } catch (error) {
    console.error('OMI NAM Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`OMI NAM backend running on port ${port}`);
});
