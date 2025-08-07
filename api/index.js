export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    message: 'OMI NAM Systems Online',
    status: 'operational',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      analyze: '/api/analyze'
    }
  });
}