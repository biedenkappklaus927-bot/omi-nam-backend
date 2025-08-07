import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

interface CameraViewProps {
  onReady: () => void;
  onError: (error: string) => void;
}

const CameraView = forwardRef<HTMLVideoElement, CameraViewProps>(
  ({ onReady, onError }, ref) => {
    useEffect(() => {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'environment', // Use back camera on mobile
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          });

          if (ref && 'current' in ref && ref.current) {
            ref.current.srcObject = stream;
            ref.current.onloadedmetadata = () => {
              onReady();
            };
          }
        } catch (error) {
          console.error('Camera access error:', error);
          if (error instanceof Error) {
            if (error.name === 'NotAllowedError') {
              onError('Camera access denied. Please allow camera permissions.');
            } else if (error.name === 'NotFoundError') {
              onError('No camera found on this device.');
            } else {
              onError('Unable to access camera. Please try again.');
            }
          } else {
            onError('Camera initialization failed.');
          }
        }
      };

      startCamera();

      // Cleanup function
      return () => {
        if (ref && 'current' in ref && ref.current && ref.current.srcObject) {
          const stream = ref.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }, [ref, onReady, onError]);

    return (
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
        <video
          ref={ref}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          aria-label="Camera preview for OMI NAM analysis"
        />
        
        {/* Camera overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-purple-400 opacity-60"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-purple-400 opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-purple-400 opacity-60"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-purple-400 opacity-60"></div>
          
          {/* Center crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border border-purple-400 rounded-full opacity-40 animate-pulse">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Scanning line effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }
);

CameraView.displayName = 'CameraView';

export default CameraView;