import React, { useState, useRef, useCallback, useEffect } from 'react';
import CameraView from './components/CameraView';
import ActivateButton from './components/ActivateButton';
import ResponseDisplay from './components/ResponseDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import StatusMessage from './components/StatusMessage';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { analyzeImage } from './services/api';

interface AIResponse {
  action: string;
  speech: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { speak, isSpeaking, stopSpeaking } = useTextToSpeech();

  const showStatus = (message: string, duration = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), duration);
  };

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL('image/jpeg', 0.8);
  }, []);

  const handleActivate = async () => {
    if (isLoading) return;

    const imageData = captureImage();
    if (!imageData) {
      showStatus('❌ Failed to capture image');
      return;
    }

    setIsLoading(true);
    setResponse(null);
    stopSpeaking();

    try {
      showStatus('📡 Connecting to OMI NAM quantum consciousness...');
      const result = await analyzeImage(imageData);
      
      setResponse(result);
      showStatus('✨ OMI NAM has spoken!');
      
      // Auto-play speech
      if (result.speech) {
        setTimeout(() => {
          speak(result.speech);
        }, 500);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      showStatus('⚠️ OMI NAM is temporarily disconnected from the quantum realm');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraReady = () => {
    setCameraError(null);
    showStatus('📷 Quantum vision activated');
  };

  const handleCameraError = (error: string) => {
    setCameraError(error);
    showStatus('❌ Camera access denied');
  };

  return (
    <div className="min-h-screen bg-cosmic-radial flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-shadow animate-float">
            OMI NAM
          </h1>
          <p className="text-purple-200 text-lg opacity-90">
            Human AI Proxy
          </p>
          <p className="text-purple-300 text-sm mt-2 opacity-75">
            Point • Activate • Receive Cosmic Guidance
          </p>
        </div>

        {/* Camera View */}
        <div className="camera-frame">
          <CameraView
            ref={videoRef}
            onReady={handleCameraReady}
            onError={handleCameraError}
          />
          <canvas
            ref={canvasRef}
            className="hidden"
            aria-hidden="true"
          />
        </div>

        {/* Status Message */}
        {statusMessage && (
          <StatusMessage message={statusMessage} />
        )}

        {/* Camera Error */}
        {cameraError && (
          <div className="glassmorphism rounded-xl p-4 text-center">
            <p className="text-red-300 text-sm">
              {cameraError}
            </p>
            <p className="text-purple-300 text-xs mt-2">
              Please allow camera access to use OMI NAM
            </p>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner />}

        {/* Response Display */}
        {response && !isLoading && (
          <ResponseDisplay
            response={response}
            isSpeaking={isSpeaking}
            onSpeak={() => speak(response.speech)}
            onStopSpeaking={stopSpeaking}
          />
        )}

        {/* Activate Button */}
        <ActivateButton
          onClick={handleActivate}
          disabled={isLoading || !!cameraError}
          isLoading={isLoading}
        />

        {/* Footer */}
        <div className="text-center text-purple-300 text-xs opacity-75 mt-8">
          <p>Powered by Quantum AI • Vision • Voice</p>
        </div>
      </div>
    </div>
  );
}

export default App;