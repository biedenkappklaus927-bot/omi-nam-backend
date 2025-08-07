# OMI NAM Setup Guide 🛠️

This guide will walk you through setting up the OMI NAM - Human AI Proxy application from scratch.

## 📋 Prerequisites

### Required Software
- **Node.js 18+**: [Download here](https://nodejs.org/)
- **Git**: [Download here](https://git-scm.com/)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge
- **Code Editor**: VS Code recommended

### Required Accounts
- **Google Cloud Platform**: For Vision API
- **OpenAI**: For GPT API access
- **GitHub**: For code repository and Pages hosting
- **Vercel** (optional): For backend deployment

## 🔧 Step-by-Step Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/omi-nam-human-ai-proxy.git
cd omi-nam-human-ai-proxy

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Google Vision API Setup

#### Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "New Project" or select existing project
3. Enter project name: "OMI NAM Vision"
4. Click "Create"

#### Enable Vision API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Cloud Vision API"
3. Click on "Cloud Vision API"
4. Click "Enable"

#### Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key
4. (Optional) Click "Restrict Key" for security:
   - Select "Cloud Vision API" under API restrictions
   - Add HTTP referrers if needed

#### Add to Environment
```bash
# Edit .env file
GOOGLE_KEY=your_actual_google_vision_api_key_here
```

### 3. OpenAI API Setup

#### Create OpenAI Account
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or sign in
3. Verify your email and phone number

#### Generate API Key
1. Go to [API Keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Give it a name: "OMI NAM"
4. Copy the key (you won't see it again!)

#### Add to Environment
```bash
# Edit .env file
OPENAI_KEY=sk-your_actual_openai_api_key_here
```

### 4. Local Development

```bash
# Start development server
npm start

# App will open at http://localhost:3000
```

#### Test Camera Access
1. Browser will ask for camera permission - click "Allow"
2. You should see live camera feed with cosmic overlay
3. Try pointing camera at different objects

#### Test API Integration
1. Point camera at any object
2. Click "Activate OMI NAM" button
3. Should see loading animation
4. Should receive AI response with action and speech

### 5. Production Deployment

#### Frontend (GitHub Pages)

```bash
# Update package.json homepage
"homepage": "https://yourusername.github.io/omi-nam-human-ai-proxy"

# Build and deploy
npm run build
npm run deploy
```

#### Backend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard:
# GOOGLE_KEY=your_key_here
# OPENAI_KEY=your_key_here
```

#### Update API URL
Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-actual-vercel-url.vercel.app' 
  : '/api';
```

## 🔍 Verification Checklist

### ✅ Local Development
- [ ] Camera preview shows with cosmic overlay
- [ ] "Activate OMI NAM" button is clickable
- [ ] Loading spinner appears when processing
- [ ] AI responses display correctly
- [ ] Text-to-speech works (check browser support)
- [ ] PWA install prompt appears (Chrome)

### ✅ API Integration
- [ ] Google Vision API returns object detection
- [ ] OpenAI API returns formatted JSON responses
- [ ] Error handling works with invalid images
- [ ] CORS headers allow frontend requests

### ✅ Production Deployment
- [ ] Frontend builds without errors
- [ ] GitHub Pages deployment succeeds
- [ ] Backend deploys to Vercel
- [ ] Environment variables set correctly
- [ ] HTTPS works (required for camera)
- [ ] Mobile responsive design

## 🐛 Common Issues & Solutions

### Camera Not Working

**Issue**: "Permission denied" or black screen
**Solution**: 
- Ensure HTTPS (camera only works on HTTPS/localhost)
- Check browser permissions in settings
- Try different browser
- Clear browser cache

### API Key Errors

**Issue**: "401 Unauthorized" or "Invalid API key"
**Solution**:
- Verify API keys are correct in .env
- Check for extra spaces or quotes
- Ensure APIs are enabled in respective consoles
- Check API usage quotas

### Build Errors

**Issue**: TypeScript compilation errors
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript version
npx tsc --version
```

### CORS Issues

**Issue**: "CORS policy" errors in browser console
**Solution**:
- Verify backend CORS headers
- Check API URL configuration
- Ensure proper HTTP methods allowed

## 🔐 Security Best Practices

### API Keys
- Never commit API keys to version control
- Use environment variables for all secrets
- Restrict API keys to specific domains/IPs when possible
- Rotate keys regularly

### HTTPS
- Always use HTTPS in production
- Camera access requires secure context
- Use proper SSL certificates

### Error Handling
- Don't expose sensitive error details to users
- Log errors server-side for debugging
- Provide user-friendly error messages

## 📊 Monitoring & Analytics

### Error Tracking
```javascript
// Add to your error handling
console.error('OMI NAM Error:', {
  timestamp: new Date().toISOString(),
  error: error.message,
  stack: error.stack
});
```

### Usage Analytics
Consider adding:
- Google Analytics for page views
- API call tracking
- Error rate monitoring
- Performance metrics

## 🚀 Performance Optimization

### Frontend
- Enable service worker for caching
- Optimize images and assets
- Use lazy loading for components
- Minimize bundle size

### Backend
- Implement response caching
- Optimize API calls
- Use CDN for static assets
- Monitor API rate limits

## 📞 Support

If you encounter issues:

1. **Check Console**: Look for error messages in browser console
2. **Review Logs**: Check server logs for API errors
3. **Test APIs**: Use tools like Postman to test endpoints directly
4. **Community**: Search GitHub issues or create new one
5. **Documentation**: Review API documentation for Google Vision and OpenAI

---

**Happy Coding! May the cosmic forces guide your development journey.** 🌌