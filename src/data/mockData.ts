import { Camera, GunDetection,VOIDetection,POIDetection, Suspect, GunshotDetection } from '../types';

export const mockSuspects: Suspect[] = [
  {
    id: '1',
    name: 'Sbu Dube',
    age: 34,
    licenseNumber: '9006065879081/FL-2023-001',
    licenseStatus: 'expired',
    description: 'Male, 34 years old, approximately 180cm tall',
    address: '1136 Zamdela Street, Zamdela'
  },
  {
    id: '2',
    licenseNumber: 'Unknown',
    licenseStatus: 'unknown',
    description: 'Unidentified individual, approximately 25-30 years old'
  },
   {
    id: '3',
    name: 'Unknown',
    licenseNumber: 'Unknown',
    licenseStatus: 'unknown',
    description: 'Unidentified individual, approximately 50 to 55 years old'
  }
];

export const mockGunDetections: GunDetection[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    status: 'active',
    confidence: 0.95,
    suspect: mockSuspects[0],
    location: { name:'Sasolburg Methodist Church',lat: -26.81140638258167, lng: 27.82493256945925 },
    imageUrl: './assets/860_gun_detected.png'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    status: 'active',
    confidence: 0.87,
    suspect: mockSuspects[1],
    location: { 
    name: 'Sasol One Main Entrance',
    lat: -26.819725740545813, 
    lng: 27.838264314206718},
    imageUrl: './assets/861_gun_detected.jpg'
  }
];

export const mockGunshotDetections: GunshotDetection[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    status: 'active',
    confidence: 0.99,
    count: 3,
    type: '9mm High calibre round',
    location: { name:'Zamdela Taxi Rank',
    lat: -26.81140638258142,
    lng: 27.82493256945931 },
    imageUrl: './assets/gunshot.jpeg'
  }, 
];

export const mockVOIDetections: VOIDetection[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 900000), 
    confidence: 0.98,
    location: { name:'178 John Voster Avenue', lat: -26.81140638258142, lng: 27.82493256945931 },
    imageUrl: './assets/polowhite.JPG',
    colour : 'White',
    make : 'Volkswagen',
    model : 'Polo',
    description: 'Involved in hit and run near Kwa-Myaname,Zamdela. Heading Northbound',
    licenseRegNumber: 'DV 96 VK-GP',
    status: 'active',
  }
];


export const mockPOIDetections: POIDetection[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 900000), 
    status: 'active',
    confidence: 0.87,
    suspect: mockSuspects[2],
    description: 'AI classification - 3 possible Suspect, armed with hand-guns',
    location: { name:'Noord Primêre Skool',
       lat: -26.809124766624087,   // Corrected (matches real-world location)
    lng: 27.833375580056966},    // Corrected (matches real-world location)},
    imageUrl: './assets/poi.JPG'
  }
];
export const mockCameras: Camera[] = [
  {
    id: '1',
    name: 'Sasolburg Methodist Church',
    lat: -26.2041,
    lng: 28.0473,
    status: 'online',
    lastSeen: new Date(),
    gunDetections: [mockGunDetections[0]],
    gunshotDetections: [],
    poiDetections: [],
    voiDetections: []
  },
  {
    id: '2',
    name: 'Sasol One Main Entrance',
    lat: -26.819725740545813, 
    lng: 27.838264314206718,
    status: 'online',
    lastSeen: new Date(),
    gunDetections: [mockGunDetections[1]],
    gunshotDetections: [],
    poiDetections: [mockPOIDetections[0]],
    voiDetections: []
  },
   {
    id: '3',
      name: 'John Vorster Avenue',
    lat: -26.812000,  // Slightly different from Zamdela Taxi Rank
    lng: 27.825000,   // Slightly different from Zamdela Taxi Rank
    status: 'online',
    lastSeen: new Date(),
    gunDetections: [],
    gunshotDetections: [],
    poiDetections: [],
    voiDetections: [mockVOIDetections[0]]
  },
  {
    id: '4',
    name: 'Zamdela Taxi Rank',
    lat: -26.81140638258142,
    lng: 27.82493256945931,
    status: 'online',
    lastSeen: new Date(Date.now() - 1800000), 
    gunDetections: [],
    gunshotDetections: [mockGunshotDetections[0]],
    poiDetections: [],
    voiDetections: []
  },
  {
    id: '5',
    name: 'Noord Primêre Skool',
    lat: -26.809124766624087,   // Corrected (matches real-world location)
    lng: 27.833375580056966,    // Corrected (matches real-world location)
    status: 'maintenance',
    lastSeen: new Date(Date.now() - 3600000), 
    gunDetections: [],
    gunshotDetections: [],
    poiDetections: [],
    voiDetections: []
  }
];

const uniquePositions = new Set(mockCameras.map(c => `${c.lat},${c.lng}`));
console.log(`Total cameras: ${mockCameras.length}, Unique positions: ${uniquePositions.size}`);
// Mock emergency data
export const emergencyAlerts = [
  {
    id: 1,
    message: "Gauteng EMS reported a light motor vehicle accident on Kerk street, Vaal Park. Multiple casualties reported.",
    severity: "high",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    message: "Sebokeng SAPS reported protest action in Zone 10 from 13:00. Multiple roads closed, vandalism reported.",
    severity: "medium",
    timestamp: new Date().toISOString()
  },
  {
    id: 3,
    message: "Vanderbijlpark Fire Department responding to warehouse fire in Industrial Area. Avoid the area.",
    severity: "critical",
    timestamp: new Date().toISOString()
  },
  {
    id: 4,
    message: "Power outage reported in Sharpeville Area. Municipal teams dispatched.",
    severity: "low",
    timestamp: new Date().toISOString()
  }
];


interface OfficerInformation {
  name: string;
  rank: string;
  forceNumber: string;
}

interface Preferences {
  Language: string;
  'Notification Settings': string;
}

// Define other interfaces...

export interface ProfileData {
  OfficerInformation: OfficerInformation;
  'Assigned Station': string;
  Preferences: Preferences;
  'Software License': {
    'License Type': string;
    'License Expiration': string;
  };
  Security: {
    'Two-Factor Authentication': string;
    'Password Last Changed': string;
  };
  'Software Updates': {
    'Current Version': string;
  };
  'Device Information': {
    'Device Type': string;
    'Device ID': string;
    'Operating System': string;
  };
}

