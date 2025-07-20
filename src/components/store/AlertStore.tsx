import { create } from 'zustand';
import { Camera } from '../../types';

type AlertStore = {
  // Camera detection state
  camerasWithDetections: Camera[];
  setCamerasWithDetections: (cameras: Camera[]) => void;
  lastDetectionTime: Date | null;
};

export const useAlertStore = create<AlertStore>((set) => ({
  // Initial state
  camerasWithDetections: [],
  
  // Action to update cameras with detections
  setCamerasWithDetections: (cameras) => 
    set({
      camerasWithDetections: cameras,
      lastDetectionTime: cameras.length > 0 ? new Date() : null
    }),
  
  lastDetectionTime: null
}));

export default useAlertStore;