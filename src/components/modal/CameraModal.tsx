 import React, { useState } from 'react';
import { X, MapPin, Clock, Wifi, WifiOff, Wrench, ArrowUpIcon } from 'lucide-react';
import { Camera, Detection } from '../../types';
import { BsExclamationTriangle } from 'react-icons/bs';

interface CameraModalProps {
  camera: Camera;
  onClose: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ camera, onClose }) => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-yellow-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{camera.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            {getStatusIcon(camera.status)}
            <span className="text-white capitalize">{camera.status}</span>
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Last seen: {camera.lastSeen.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>Location: {camera.lat.toFixed(4)}, {camera.lng.toFixed(4)}</span>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3">Live Feed</h3>
            {camera.status === 'online' ? (
              <div className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
            
        {camera.name === 'Sasolburg Mall Entrance 1' && (
          <iframe 
            src="https://drive.google.com/file/d/1fMBVG0cxIVGTdZOhYAIjkNvuCa--VQ3E/preview?autoplay=1&mute=1&loop=1&controls=0"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            loading="eager"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
        )}

        {camera.name === 'Sasolburg Methodist Church' && (
          <iframe 
            src="https://drive.google.com/file/d/1fLyKih1N6H2YKo9_tKobr2YyGkAtOzNu/preview?autoplay=1&mute=1&loop=1&controls=0"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            loading="eager"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
        )}

         {camera.name === 'Operation Bula tsela Street Cam' && (
          <iframe 
            src="https://drive.google.com/file/d/1fPeNzRC_RCQNtsMnH1DnSWBSZlL4gTdm/preview?autoplay=1&mute=1&loop=1&controls=0"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            loading="eager"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
        )}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
                <p className="text-white text-sm font-medium">Live Video Feed</p>
                <p className="text-gray-300 text-xs">Streaming from {camera.name}</p>
              </div>
            </div>
            ) : (
              <div className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <WifiOff className="w-12 h-12 mx-auto mb-2" />
                  <p>Camera Offline</p>
                </div>
              </div>
            )}
          </div>

         {detections.length > 0 && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 animate-pulse-once">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-red-400 font-medium flex items-center gap-2">
                <BsExclamationTriangle className="h-4 w-4" />
                Recent Detections ({detections.length})
              </h3>
              <span className="text-xs text-red-300">
                Last: {detections[0].timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="space-y-3">
              {detections.map((detection) => (
                <div 
                  key={detection.id} 
                  className="text-sm bg-red-900/30 p-2 rounded border border-red-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">{detection.type.replace('-', ' ')}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-red-800/50 rounded">
                        {(detection.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-300">
                      {detection.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {detection.status === 'in-progress' && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-amber-400">
                      <ArrowUpIcon className="h-3 w-3 animate-spin" />
                      Active monitoring
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
    )}
        </div>
      </div>
    </div>
  );
};

export default CameraModal;