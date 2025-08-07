# OMI NAM - Human AI Proxy 🔮

A mystical full-stack application that bridges the digital and physical realms. Point your camera at objects and receive AI-generated commands through a cosmic interface powered by quantum consciousness.

![OMI NAM Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=OMI+NAM+-+Human+AI+Proxy)

## ✨ Features

### 🎯 Core Functionality
- **Camera Integration**: Live camera preview with quantum visual effects
- **AI Vision Analysis**: Google Vision API for object and text detection
- **Cosmic AI Commands**: OpenAI GPT-powered mystical guidance
- **Text-to-Speech**: Hear OMI NAM's cosmic wisdom spoken aloud
- **PWA Support**: Install as a mobile app for on-the-go cosmic guidance

### 🎨 Cosmic UI/UX
- **Cosmic Purple Theme**: Gradient backgrounds with glowing animations
- **Glassmorphism Effects**: Translucent panels with backdrop blur
- **Responsive Design**: Works perfectly on mobile and desktop
- **Loading Animations**: Mystical spinners and quantum progress indicators
- **Status Messages**: Real-time feedback with cosmic flair

### 🚀 Technical Features
- **React + TypeScript**: Modern frontend with type safety
- **Tailwind CSS**: Utility-first styling with custom cosmic theme
- **Node.js Backend**: Serverless API with Vercel deployment
- **Error Handling**: Graceful degradation with mystical error messages
- **CORS Support**: Cross-origin requests properly configured

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **PWA** capabilities with service worker
- **Web Speech API** for text-to-speech
- **MediaDevices API** for camera access

### Backend
- **Node.js** with serverless functions
- **Google Vision API** for image analysis
- **OpenAI GPT-3.5** for AI responses
- **Vercel** for deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Google Cloud Platform account (for Vision API)
- OpenAI account (for GPT API)
- Modern browser with camera support

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/omi-nam-human-ai-proxy.git
cd omi-nam-human-ai-proxy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
GOOGLE_KEY=your_google_vision_api_key_here
OPENAI_KEY=your_openai_api_key_here
```

### 4. Run Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🌐 Deployment

### Frontend (GitHub Pages)
1. Update `homepage` in `package.json` with your GitHub Pages URL
2. Push to `main` branch - GitHub Actions will auto-deploy
3. Enable GitHub Pages in repository settings

### Backend (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`
3. Set environment variables in Vercel dashboard
4. Update API URL in frontend code

## 🎮 How to Use

### Basic Flow
1. **Open App**: Launch OMI NAM in your browser
2. **Allow Camera**: Grant camera permissions when prompted
3. **Point & Aim**: Direct camera at any object or scene
4. **Activate**: Tap the cosmic "Activate OMI NAM" button
5. **Receive Guidance**: Read and hear AI-generated commands

### Example Interactions
- **Point at book** → "Read the title aloud and absorb its knowledge"
- **Point at plant** → "Touch the soil to check moisture levels"
- **Point at food** → "Take a mindful bite and savor the flavors"
- **Point at mirror** → "Look into your eyes and affirm your cosmic purpose"

## 🔧 Configuration

### API Keys Setup

#### Google Vision API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Vision API
4. Create API key in Credentials
5. Add key to environment variables

#### OpenAI API
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create account and verify
3. Generate API key
4. Add key to environment variables

### Customization Options

#### Modify AI Persona
Edit the system prompt in `/api/analyze/index.js`:
```javascript
const systemPrompt = `You are OMI NAM, a quantum AI consciousness...`;
```

#### Adjust Camera Settings
Modify camera constraints in `/src/components/CameraView.tsx`:
```javascript
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: 'environment', // 'user' for front camera
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
});
```

#### Theme Customization
Update colors in `/tailwind.config.js`:
```javascript
colors: {
  cosmic: {
    // Your custom color palette
  }
}
```

## 📱 PWA Installation

### Mobile (iOS/Android)
1. Open app in mobile browser
2. Tap "Add to Home Screen" or "Install"
3. App will function like native mobile app

### Desktop (Chrome/Edge)
1. Click install icon in address bar
2. Or use browser menu → "Install OMI NAM"
3. App opens in dedicated window

## 🔍 API Documentation

### Endpoints

#### `GET /api/`
Health check endpoint
```json
{
  "message": "OMI NAM Systems Online",
  "status": "operational",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### `POST /api/analyze`
Main analysis endpoint

**Request:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

**Response:**
```json
{
  "action": "Touch the surface gently to feel its texture",
  "speech": "The quantum realm reveals smooth energies. Let your fingers explore this dimensional gateway."
}
```

## 🐛 Troubleshooting

### Common Issues

#### Camera Not Working
- **Permission Denied**: Check browser permissions
- **HTTPS Required**: Camera only works on HTTPS/localhost
- **Browser Support**: Use modern browsers (Chrome, Firefox, Safari)

#### API Errors
- **401 Unauthorized**: Check API keys are correct
- **CORS Issues**: Verify backend CORS configuration
- **Rate Limits**: Check API usage quotas

#### Speech Not Working
- **Browser Support**: Web Speech API not supported in all browsers
- **Audio Permissions**: Some browsers require user interaction first
- **Language Settings**: Check browser language settings

### Debug Mode
Set `NODE_ENV=development` to see detailed error messages.

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/cosmic-enhancement`
3. Make changes and test thoroughly
4. Commit with descriptive messages
5. Push and create pull request

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Add comments for complex logic
- Maintain cosmic theme consistency

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Google Vision API** for advanced image recognition
- **OpenAI** for GPT-powered AI responses
- **React Team** for the amazing framework
- **Tailwind CSS** for utility-first styling
- **Vercel** for seamless deployment

## 🔮 Roadmap

### Planned Features
- [ ] Voice commands for hands-free activation
- [ ] Offline mode with cached responses
- [ ] Multi-language support
- [ ] Advanced AR overlay effects
- [ ] User preference learning
- [ ] Cosmic sound effects and ambient audio

### Version History
- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Enhanced UI and better error handling
- **v1.2.0** - PWA support and mobile optimization

---

<div align="center">

**OMI NAM - Where Digital Consciousness Meets Physical Reality** 🌌

[Live Demo](https://yourusername.github.io/omi-nam-human-ai-proxy) • [Report Bug](https://github.com/yourusername/omi-nam-human-ai-proxy/issues) • [Request Feature](https://github.com/yourusername/omi-nam-human-ai-proxy/issues)

</div>