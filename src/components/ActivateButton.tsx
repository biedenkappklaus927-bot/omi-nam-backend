import React from 'react';

interface ActivateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const ActivateButton: React.FC<ActivateButtonProps> = ({ onClick, disabled, isLoading }) => {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          cosmic-button animate-glow
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:cosmic-glow'}
          ${isLoading ? 'animate-pulse-glow' : ''}
          relative overflow-hidden
        `}
        aria-label={isLoading ? 'OMI NAM is analyzing' : 'Activate OMI NAM analysis'}
      >
        <span className="relative z-10 flex items-center justify-center space-x-2">
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span className="text-xl">🔮</span>
              <span>Activate OMI NAM</span>
            </>
          )}
        </span>
        
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-cosmic-600 to-purple-600 animate-pulse opacity-20"></div>
        
        {/* Ripple effect */}
        {!disabled && (
          <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
        )}
      </button>
      
      <p className="text-purple-300 text-xs mt-2 opacity-75">
        {disabled 
          ? 'Awaiting camera activation...' 
          : isLoading 
            ? 'Quantum consciousness engaged...'
            : 'Point camera at object and activate'
        }
      </p>
    </div>
  );
};

export default ActivateButton;