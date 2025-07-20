import React from 'react';
import { AlertTriangle, MapPin, Clock, User, FileText, X } from 'lucide-react';
import { VOIDetection } from '../../types';
import alertSounds from '/assets/sounds/radio-338296.mp3?url';

interface DetectionAlertProps {
  detection: VOIDetection;
  onClose: () => void;
}

const VOIDetectionAlert: React.FC<DetectionAlertProps> = ({ detection, onClose }) => {
   const playAlertSound = () => {
    const audio = new Audio(alertSounds);
    audio.volume = 0.6;
    audio.play().catch(error => console.log('Audio playback failed:', error));
  };
  const getLicenseStatusColor = (status: string) => {
    playAlertSound();
    switch (status) {
      case 'valid':
        return 'text-green-400';
      case 'fake':
        return 'text-yellow-400';
      case 'pursuit':
        return 'text-red-400';
      case 'hijacked':
        return 'text-red-400';
      case 'stolen':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

   const markSafe = (detection: VOIDetection) => {
      detection.status ='safe';
      onClose();
    }

  return (
    <div className="fixed inset-0 bg-yellow-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border-1 border-yellow-500 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-yellow-400">Vehicle of Interest Detected!</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-900/20 rounded-lg p-4">
            <img
              src={detection.imageUrl}
              alt="Detection"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <div className="text-center">
              <div className="text-green-400 font-medium">
                Confidence: {(detection.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <p>{detection.location.name}</p>
              <span>{detection.timestamp.toLocaleString()}</span>
            </div>

            <div className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-white font-medium mb-2">
                <User className="w-4 h-4" />
                <span>Vehicle Information</span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg">
             
              {/* Image container */}
             {/* Conditionally render suspect photo */}
              

              {/* Form fields - now displayed inline */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                <p className="col-span-2 font-semibold text-lg mb-1">Vehicle Details</p>
                
                <div>
                  <p><strong className="text-gray-800">Make:</strong> {detection.make || 'Unknown'}</p>
                </div>
                <div>
                  <p><strong className="text-gray-800">Model:</strong> {detection.model || 'Unknown'}</p>
                </div>
                <div className="col-span-2">
                  <p><strong className="text-gray-800">Colour:</strong> {detection.colour || 'Not provided'}</p>
                </div>
                 <div className="col-span-2">
                  <p><strong className="text-gray-800">Description:</strong> {detection.description || 'Not provided'}</p>
                </div>
              </div>
            </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-3">
              <div className="bg-gray-700 flex items-center space-x-2 text-white font-medium mb-2">
                <FileText className="w-4 h-4" />
                <span>License Plate License Information</span>
              </div>
              <div className="bg-gray-700 text-sm text-gray-300 space-y-1">
                <p><strong>License REG:</strong> {detection.licenseRegNumber}</p>
                <p>
                  <strong>Status:</strong> 
                  <span className={`ml-1 font-medium ${getLicenseStatusColor(detection.status)}`}>
                    {detection.status.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Dispatch Drone
            </button>
            <button onClick={() => markSafe(detection)}  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Mark Safe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VOIDetectionAlert;