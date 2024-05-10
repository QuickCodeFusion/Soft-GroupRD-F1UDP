"use client"
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface Driver {
  aiControlled: number
  driverId: number
  networkId: number
  teamId: number
  myTeam: number
  raceNumber: number
  nationality: number
  name: string
  platform: number
  position: number
  gridPosition: number
  time: number
}

const RaceDriversTable: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
    
    socket.on('participantsPosition', (data: Driver[]) => {
      if(data.length > 0) {
        console.log(data);
        setDrivers(data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  

  return (
    <div>
      <h1>Race Drivers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Car Number</th>
            <th>Nationality</th>
            <th>Position</th>
            <th>GridP</th>
            <th>time</th>
          </tr>
        </thead>
        <tbody>
          {drivers?.sort((a, b) => a.position - b.position).map((driver, index) => (
            <tr key={index}>
              <td>{driver.name}</td>
              <td>{driver.raceNumber}</td>
              <td>{driver.nationality}</td>
              <td>{driver.position}</td>
              <td>{driver.gridPosition}</td>
              <td>{driver.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceDriversTable;
