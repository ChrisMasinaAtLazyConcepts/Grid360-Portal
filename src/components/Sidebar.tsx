import React, { useState } from 'react';
import { Camera, Video, Wifi, WifiOff, Wrench, AlertTriangle, CarIcon } from 'lucide-react';
import { Camera as CameraType } from '../types';
import { CgDanger } from 'react-icons/cg';
import { CiWarning } from 'react-icons/ci';

interface SidebarProps {
  cameras: CameraType[];
  onCameraSelect: (camera: CameraType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ cameras }) => {
const [selectedCamera, setSelectedCamera] = useState<CameraType | null>(null);
const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

const onCameraSelect = (camera: CameraType) => {
  setSelectedCamera(camera);
};

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

  const onlineCameras = cameras.filter(c => c.status === 'online');
  const offlineCameras = cameras.filter(c => c.status === 'offline');
  const maintenanceCameras = cameras.filter(c => c.status === 'maintenance');

  const camerasWithActiveDetections = cameras.filter(camera => {
    const hasActiveGun = camera.gunDetections.some(d => d.status === 'active');
    const hasActivePOI = camera.poiDetections.some(d => d.status === 'active');
    const hasActiveVOI = camera.voiDetections.some(d => d.status === 'active');
    const hasActiveGunshot = camera.gunshotDetections.some(d => d.status === 'active');
    
    return hasActiveGun || hasActivePOI || hasActiveVOI || hasActiveGunshot;
  });

  return (
   <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700  overflow-y-auto ">
        <div className="hidden md:block text-yellow-400 text-sm mb-[3px]">
          Metsimaholo District, Sasolburg
        </div>
        <h2 className="text-lg font-semibold text-white mb-4">Camera Network</h2>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-green-900/20 p-2 rounded text-center">
            <div className="text-green-400 font-bold">{onlineCameras.length}</div>
            <div className="text-green-400 text-xs">Online</div>
          </div>
          <div className="bg-red-900/20 p-2 rounded text-center">
            <div className="text-red-400 font-bold">{offlineCameras.length}</div>
            <div className="text-red-400 text-xs">Offline</div>
          </div>
          <div className="bg-yellow-900/20 p-2 rounded text-center">
            <div className="text-yellow-400 font-bold">{maintenanceCameras.length}</div>
            <div className="text-yellow-400 text-xs">Maintenance</div>
          </div>
        </div>
      </div>

      {camerasWithActiveDetections.length > 0 && (
        <div className="p-4 border-b border-gray-700">
           <div className="flex items-center space-x-2 mb-3">
            <CarIcon className="w-5 h-5 text-white" />
            <h3 className="font-medium text-white">Active Patrols</h3>
          </div>
          0
          <hr/>
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-white" />
            <h3 className="font-medium text-white">Active Alerts</h3>
          </div>
          <div className="space-y-2">
            {camerasWithActiveDetections.map(camera => {
              const totalDetections = camera.gunDetections.length + camera.poiDetections.length + camera.voiDetections.length + camera.gunshotDetections.length;
              const isSpecialCamera = camera.gunshotDetections.length > 0;
              return (
                <button
                  key={camera.id}
                  onClick={() => onCameraSelect(camera)}
                  className={`w-full border rounded-lg p-2 text-left transition-colors ${
                    isSpecialCamera 
                      ? 'bg-red-900/20 border-red-500/50 hover:bg-red-900/30'
                      : 'bg-yellow-900/20 border-red-500/50 hover:bg-red-900/30'
                  }`}
                >
                  <div className={`font-medium text-sm ${
                    isSpecialCamera ? 'text-yellow-400' : 'text-yellow-400'
                  }`}>
                    {camera.name}
                  </div>
                  <div className={`text-xs ${
                    isSpecialCamera ? 'text-yellow-300' : 'text-yellow-300'
                  }`}>
                    <span className="flex items-center gap-1">
                      <CiWarning /> 
                      {totalDetections} detection{totalDetections !== 1 && 's'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
         {camerasWithActiveDetections.length <= 0 && (
        <div>
          {cameras.map(camera => (
            <button
              key={camera.id}
              onClick={() => onCameraSelect(camera)}
             className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-3 mb-0.5 text-left transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-medium">{camera.name}</span>
                </div>
                {getStatusIcon(camera.status)}
              </div>
              
              <div className="text-xs text-gray-400 space-y-1">
                <div>Last seen: {camera.lastSeen.toLocaleString()}</div>
                <div>Location: {camera.lat.toFixed(4)}, {camera.lng.toFixed(4)}</div>
              </div>
            </button>
          ))}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;