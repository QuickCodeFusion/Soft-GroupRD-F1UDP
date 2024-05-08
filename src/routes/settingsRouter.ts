import EnvVars from '@src/constants/EnvVars';
import { NodeEnvs } from '@src/constants/misc';
import { relateLapDataToDriver } from '@src/util/raceData';
import { F123UDP } from 'f1-23-udp';
import { io } from '..';
import { 
  finalClassificationListener,
} from '@src/listeners/f123Client/finalClassification';

export let f123Client: F123UDP | null = null;
let port: number = 20777,
  address: string = '192.168.1.81';

function appendListeners() {
  if (f123Client !== null) {
    f123Client.on('lapData', (lapData) => {
      f123Client?.on('participants', (participants) => {
        const participantsPosition = relateLapDataToDriver(lapData, participants);
        io.emit('participantsPosition', participantsPosition);
      });
    });
        
    f123Client.on('finalClassification', (data) => {
      finalClassificationListener(io, data);
    });
  }
}

function startClient(port?: number, address?: string) {
  f123Client = new F123UDP({
    port: port || 20777,
    address: address || '192.168.1.81',
  });
  f123Client.start();
}
export const changePortAndAddress = (newPort?: number, newAddress?: string) => {
  if (newPort !== undefined) {
    port = newPort;
  }
  if (newAddress !== undefined) {
    address = newAddress;
  }
  if (f123Client !== null) {
    f123Client.stop();
  }
  startClient(port, address);
  appendListeners();

  if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
    // eslint-disable-next-line no-console
    console.log('Servidor iniciado en el puerto ' + port);
  }
};

export const restartClient = () => {
  if (f123Client !== null) {
    f123Client.stop();
    f123Client = null;
  }
  startClient();
  appendListeners();
};

export const getDetails = () => {
  return {
    port,
    address,
  };
};
