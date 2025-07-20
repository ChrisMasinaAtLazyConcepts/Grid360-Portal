import React, { useState, useEffect } from 'react';
// import PatrolService from './PatrolService'; // Assuming you have a service for getting patrols

export interface Patrol {
  id: string | number;
  name: string;
  description: string;
  geofences: Geofence[];
  officers: Officer[];
  startTime: Date | string;
  endTime: Date | string;
  status: PatrolStatus;
}

export interface Geofence {
  lat: number;
  lng: number;
  radius: number;
}

export interface Officer {
  id: string | number;
  name: string;
  // Add any other properties that an officer might have
}

export enum PatrolStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}

const Patrols = () => {
 const [patrols, setPatrols] = useState<Patrol[]>([]);
  const [selectedPatrol, setSelectedPatrol] = useState(null);
  const [geofences, setGeofences] = useState([]);

  useEffect(() => {
    const getPatrols = async () => {
      const patrols:any[] =[];
    //  setPatrols(patrols);
    };
    getPatrols();
  }, []);

  // const handlePatrolSelect = (patrol) => {
  //   setSelectedPatrol(patrol);
  //   const geofences = patrol.geofences.map((geofence) => ({
  //     lat: geofence.lat,
  //     lng: geofence.lng,
  //     radius: geofence.radius,
  //   }));
  //   setGeofences(geofences);
  // };

  const handleStartPatrol = () => {
    // Call the API to start the patrol
   // PatrolService.startPatrol(patrol.id);
  };

  return (
    <div>
      <h2>Patrols</h2>
      <select
       value={selectedPatrol ? (selectedPatrol as Patrol).id : ''}
        onChange={(e) => {
          const selectedPatrol = patrols.find((patrol) => patrol.id === e.target.value);
          // handlePatrolSelect(selectedPatrol);
        }}
      >
        <option value="">Select a patrol</option>
        {patrols.map((patrol) => (
          <option key={patrol.id} value={patrol.id}>
            {patrol.name}
          </option>
        ))}
      </select>
      {selectedPatrol && (
        <div>
          <button onClick={() => handleStartPatrol()}>Start Patrol</button>
        </div>
      )}
      {!selectedPatrol && patrols.map((patrol) => (
        <div key={patrol.id}>
          <button onClick={() => handleStartPatrol()}>Start {patrol.name}</button>
        </div>
      ))}
    </div>
  );
};

export default Patrols;