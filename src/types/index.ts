export interface Camera {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: Date;
  gunDetections: GunDetection[];
  gunshotDetections: GunshotDetection[];
  voiDetections: VOIDetection[];
  poiDetections: POIDetection[];
  detections? : Detection[]
}

export interface Detection {
  id: string;
  type: 'gunshot' | 'person' | 'vehicle';
  confidence: number;
  timestamp: Date;
  status?: 'new' | 'in-progress' | 'resolved';
}

export interface GunDetection {
  id: string;
  status: string;
  timestamp: Date;
  confidence: number;
  suspect: Suspect;
  location: {
    name?: string;
    lat: number;
    lng: number;
  };
  imageUrl: string;
}

export interface GunshotDetection {
  id: string;
  timestamp: Date;
  status: string;
  confidence: number;
  count: number;
  type: string;
  location: {
    name?: string;
    lat: number;
    lng: number;
  };
  imageUrl: string;
}

export interface VOIDetection {
  id: string;
  timestamp: Date;
  confidence: number;
  make: string;
  model: string;
  colour: string;
  description: string;
  licenseRegNumber: string;
  status: string;
  location: {
    name?: string;
    lat: number;
    lng: number;
  };
  imageUrl: string;
}

export interface POIDetection {
  id: string;
  timestamp: Date;
  status: string;
  confidence: number;
  suspect: Suspect;
  description: string;
  location: {
    name?: string;
    lat: number;
    lng: number;
  };
  imageUrl: string;
}

export interface Suspect {
  id: string;
  name?: string;
  age?: number;
  licenseNumber?: string;
  licenseStatus: 'valid' | 'expired' | 'revoked' | 'unknown';
  description: string;
  address?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'operator' | 'viewer';
  badge: string;
}