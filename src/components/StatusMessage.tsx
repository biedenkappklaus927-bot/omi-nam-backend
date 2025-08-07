import React, { useEffect, useState } from 'react';

interface StatusMessageProps {
  message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [message]);

  if (!message) return null;

  return (
    <div 
      className={`
        glassmorphism rounded-lg p-3 text-center transition-all duration-500 transform
        ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}
      `}
    >
      <p className="text-white text-sm font-medium flex items-center justify-center space-x-2">
        <span className="animate-pulse">✨</span>
        <span>{message}</span>
        <span className="animate-pulse">✨</span>
      </p>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg border border-purple-400/30 animate-pulse"></div>
    </div>
  );
};

export default StatusMessage;