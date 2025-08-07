import { useState, useCallback, useEffect } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech not supported in this browser');
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const newUtterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings for cosmic AI persona
    newUtterance.rate = 0.9; // Slightly slower for mystical effect
    newUtterance.pitch = 1.1; // Slightly higher pitch
    newUtterance.volume = 0.8;
    
    // Try to find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = voices.filter(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Alex'))
    );
    
    if (preferredVoices.length > 0) {
      newUtterance.voice = preferredVoices[0];
    }

    newUtterance.onstart = () => {
      setIsSpeaking(true);
    };

    newUtterance.onend = () => {
      setIsSpeaking(false);
      setUtterance(null);
    };

    newUtterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setUtterance(null);
    };

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setUtterance(null);
    }
  }, []);

  // Load voices when they become available
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    isSupported: 'speechSynthesis' in window
  };
};