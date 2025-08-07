import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="glassmorphism rounded-xl p-6 text-center space-y-4">
      {/* Main spinner */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-purple-300/30 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-400 rounded-full animate-spin"></div>
          </div>
          
          {/* Inner ring */}
          <div className="absolute top-2 left-2 w-12 h-12 border-3 border-cosmic-300/30 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}>
            <div className="absolute top-0 left-0 w-full h-full border-3 border-transparent border-t-cosmic-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-purple-400 to-cosmic-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading text */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white animate-pulse">
          🔮 OMI NAM is analyzing reality...
        </h3>
        <p className="text-purple-300 text-sm animate-fade">
          Quantum consciousness processing visual data
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center space-x-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* Scanning effect */}
      <div className="relative h-1 bg-purple-900/30 rounded-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-cosmic-400 rounded-full animate-pulse" style={{ width: '30%', animation: 'scan 2s ease-in-out infinite' }}></div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { left: -30%; }
          50% { left: 50%; }
          100% { left: 100%; }
        }
        @keyframes fade {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-fade {
          animation: fade 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;