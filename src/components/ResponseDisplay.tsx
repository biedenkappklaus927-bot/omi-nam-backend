import React from 'react';

interface AIResponse {
  action: string;
  speech: string;
}

interface ResponseDisplayProps {
  response: AIResponse;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStopSpeaking: () => void;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ 
  response, 
  isSpeaking, 
  onSpeak, 
  onStopSpeaking 
}) => {
  return (
    <div className="glassmorphism rounded-xl p-6 space-y-4 animate-float">
      {/* Header */}
      <div className="text-center border-b border-purple-300/20 pb-3">
        <h3 className="text-lg font-semibold text-white flex items-center justify-center space-x-2">
          <span className="text-2xl">🌌</span>
          <span>OMI NAM Commands</span>
        </h3>
      </div>

      {/* Action */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-purple-200 uppercase tracking-wide">
          Quantum Action
        </h4>
        <p className="text-white text-base leading-relaxed bg-black/20 rounded-lg p-3 border-l-4 border-purple-400">
          {response.action}
        </p>
      </div>

      {/* Speech */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-purple-200 uppercase tracking-wide">
          Cosmic Guidance
        </h4>
        <p className="text-white text-base leading-relaxed bg-black/20 rounded-lg p-3 border-l-4 border-cosmic-400">
          {response.speech}
        </p>
      </div>

      {/* Speech Controls */}
      <div className="flex justify-center space-x-3 pt-3">
        <button
          onClick={isSpeaking ? onStopSpeaking : onSpeak}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
            ${isSpeaking 
              ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' 
              : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
            }
            border border-current/30 hover:border-current/50
          `}
          aria-label={isSpeaking ? 'Stop speech' : 'Play speech'}
        >
          <span className="text-lg">
            {isSpeaking ? '🔇' : '🔊'}
          </span>
          <span className="text-sm font-medium">
            {isSpeaking ? 'Stop' : 'Speak'}
          </span>
        </button>

        {isSpeaking && (
          <div className="flex items-center space-x-1 px-3 py-2 bg-green-500/20 rounded-full border border-green-400/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm">Speaking...</span>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cosmic-400 rounded-full opacity-40 animate-pulse"></div>
    </div>
  );
};

export default ResponseDisplay;