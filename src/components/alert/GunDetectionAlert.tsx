import React, { useEffect, useState } from 'react';
import { AlertTriangle, MapPin, Clock, User, FileText, X } from 'lucide-react';
import { GunDetection } from '../../types';
import alertSounds from '/assets/sounds/radio-338296.mp3?url';
import { FiCheckCircle } from 'react-icons/fi';


interface DetectionAlertProps {
  detection: GunDetection;
  onClose: () => void;
}

const GunDetectionAlert: React.FC<DetectionAlertProps> = ({ detection, onClose }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
  if (showToast) {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }
}, [showToast]);

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
      case 'expired':
        return 'text-yellow-400';
      case 'revoked':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const markSafe = (detection: GunDetection) => {
    detection.status ='safe';
    onClose();
    setShowToast(true);
  };



  
  return (
    
    <div className="fixed inset-0 bg-yellow-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border-1 border-yellow-500 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-yellow-400">Firearm Detected!</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {showToast && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Marked as safe successfully</span>
            </div>
          </div>
        )}
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
                <span>Suspect Information</span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg">
             
              {/* Image container */}
             {/* Conditionally render suspect photo */}
              {detection.suspect.name ? (
                <div className="flex-shrink-0">
                  <img
                    src="/assets/sbu.jpeg"
                    alt={`Photo of ${detection.suspect.name}`}
                    className="w-16 h-16 object-contain rounded-sm"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <img
                    src="/assets/logos/notfound.jpeg"
                    alt="No suspect photo available"
                    className="w-16 h-16 object-contain rounded-sm opacity-50"
                  />
                </div>
              )}

              {/* Form fields - now displayed inline */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                <p className="col-span-2 font-semibold text-lg mb-1">Suspect Details</p>
                
                <div>
                  <p><strong className="text-gray-800">Name:</strong> {detection.suspect.name || 'Unknown'}</p>
                </div>
                <div>
                  <p><strong className="text-gray-800">Age:</strong> {detection.suspect.age || 'Unknown'}</p>
                </div>
                <div className="col-span-2">
                  <p><strong className="text-gray-800">Description:</strong> {detection.suspect.description || 'Not provided'}</p>
                </div>
                <div className="col-span-2">
                  <p><strong className="text-gray-800">Address:</strong> {detection.suspect.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-3">
              <div className="bg-gray-700 flex items-center space-x-2 text-white font-medium mb-2">
                <FileText className="w-4 h-4" />
                <span>Firearm License Information</span>
              </div>
              <div className="bg-gray-700 text-sm text-gray-300 space-y-1">
                <p><strong>License:</strong> {detection.suspect.licenseNumber}</p>
                <p>
                  <strong>Status:</strong> 
                  <span className={`ml-1 font-medium ${getLicenseStatusColor(detection.suspect.licenseStatus)}`}>
                    {detection.suspect.licenseStatus.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Dispatch Unit
            </button>
            <button  onClick={() => markSafe(detection)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Mark Safe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GunDetectionAlert;