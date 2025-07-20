import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import GoogleMap from './GoogleMapComponent';
import CameraModal from './modal/CameraModal';
import DetectionAlert from './alert/GunDetectionAlert';
import { Camera, GunDetection, GunshotDetection, POIDetection, VOIDetection,  } from '../types';
import { mockCameras } from '../data/mockData';
import { useNotifications } from '../hooks/useNotifications';
import GunDetectionAlert from './alert/GunDetectionAlert';
import VOIDetectionAlert from './alert/VOIDetectionAlert';
import GunshotDetectionAlert from './alert/GunshotDetectionAlert';
import POIDetectionAlert from './alert/POIDetectionAlert';
import GoogleMapComponent from './GoogleMapComponent';
import ErrorBoundary from './error/ErrorBoundary';

const Home: React.FC = () => {
  const [cameras] = useState<Camera[]>(mockCameras);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [activePOIAlert, setActivePOIAlert] = useState<POIDetection | null>(null);
  const [activeVOIAlert, setActiveVOIAlert] = useState<VOIDetection | null>(null);
  const [activeGunAlert, setActiveGunAlert] = useState<GunDetection | null>(null);
  const [activeGunshotAlert, setActiveGunshotAlert] = useState<GunshotDetection | null>(null);

  const { showNotification } = useNotifications();

  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
  };

 
  const handleGunDetectionAlert = (detection: GunDetection) => {
    if(detection.status === 'active'){
    setActiveGunAlert(detection);
      showNotification('Gun Detected!', {
        body: `Detection at ${detection.location.lat.toFixed(4)}, ${detection.location.lng.toFixed(4)}`,
        tag: 'gun-detection'
      });
    }
 
  };

    const handleGunshotDetectionAlert = (detection: GunshotDetection) => {
    if(detection.status === 'active'){
      setActiveGunshotAlert(detection);
      showNotification('Gunshot Detected!', {
        body: `Detection at ${detection.location.lat.toFixed(4)}, ${detection.location.lng.toFixed(4)}`,
        tag: 'gun-shot-detection'
      });
    }
  };

    const handlePOIDetectionAlert = (detection: POIDetection) => {
    if(detection.status === 'active'){
    setActivePOIAlert(detection);
    showNotification('Person of interest Detected!', {
      body: `Detection at ${detection.location.lat.toFixed(4)}, ${detection.location.lng.toFixed(4)}`,
      tag: 'poi-detection'
    });
    }
  };

    const handleVOIDetectionAlert = (detection: VOIDetection) => {
    if(detection.status === 'active'){
    setActiveVOIAlert(detection);
    showNotification('Vehicle of Interest Detected!', {
      body: `Detection at ${detection.location.lat.toFixed(4)}, ${detection.location.lng.toFixed(4)}`,
      tag: 'gun-detection'
    });
    }
  };

  const handleCloseGunAlert = () => {
    setActiveGunAlert(null);
  };

   const handleCloseGunshotAlert = () => {
    setActiveGunshotAlert(null);
  };
    const handleClosePOIAlert = () => {
    setActivePOIAlert(null);
  };
    const handleCloseVOIAlert = () => {
    setActiveVOIAlert(null);
  };

  const handleCloseModal = () => {
    setSelectedCamera(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar cameras={cameras} onCameraSelect={handleCameraClick} />
        <GoogleMapComponent
          cameras={cameras}
          onCameraClick={handleCameraClick}
          onGunDetectionAlert={handleGunDetectionAlert}
          onGunshotDetectionAlert={handleGunshotDetectionAlert}
          onVOIDetectionAlert={handleVOIDetectionAlert}
          onPOIDetectionAlert={handlePOIDetectionAlert}
          />
      </div>

      {selectedCamera && (
        <CameraModal camera={selectedCamera} onClose={handleCloseModal} />
      )}

      {activeGunAlert && (
        <GunDetectionAlert detection={activeGunAlert} onClose={handleCloseGunAlert} />
      )}
       {activeGunshotAlert && (
        <GunshotDetectionAlert detection={activeGunshotAlert} onClose={handleCloseGunshotAlert} />
      )}
      {activeVOIAlert && (
        <VOIDetectionAlert detection={activeVOIAlert} onClose={handleCloseVOIAlert} />
      )}
      {activePOIAlert && (
        <POIDetectionAlert detection={activePOIAlert} onClose={handleClosePOIAlert} />
      )}
    </div>
  );
};

export default Home;