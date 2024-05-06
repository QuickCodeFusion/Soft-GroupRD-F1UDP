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
      setDrivers(data);
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
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td>{driver.name}</td>
              <td>{driver.raceNumber}</td>
              <td>{driver.nationality}</td>
              <td>{driver.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceDriversTable;
