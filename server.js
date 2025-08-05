const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.send('OMI NAM Systems Online');
});

// Main analysis endpoint
app.post('/analyze', async (req, res) => {
  try {
    const { image } = req.body;
    
    // Google Vision API call
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          requests: [{
            image: { content: image.split(',')[1] },
            features: [
              { type: 'OBJECT_DETECTION' },
              { type: 'LABEL_DETECTION' },
              { type: 'TEXT_DETECTION' }
            ]
          }]
        })
      }
    );
    
    const visionData = await visionResponse.json();
    const objects = visionData.responses[0].localizedObjectAnnotations || [];
    const labels = visionData.responses[0].labelAnnotations || [];
    const text = visionData.responses[0].textAnnotations || [];
    
    // Build scene description
    const sceneDesc = [
      ...objects.map(obj => obj.name),
      ...labels.map(label => label.description),
      text.length > 0 ? `Text: "${text[0].description}"` : ''
    ].filter(Boolean).slice(0, 10).join(', ');
    
    // OpenAI call with OMI NAM persona
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
    const result = JSON.parse(aiResponse.choices[0].message.content);
    
    res.json(result);
  } catch (error) {
    console.error('OMI NAM Error:', error);
    res.status(500).json({ error: 'Quantum analysis failed' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('OMI NAM backend running on port', port);
});
