import EnvVars from '@src/constants/EnvVars';
import { NodeEnvs } from '@src/constants/misc';
import { relateLapDataToDriver } from '@src/util/raceData';
import { F123UDP } from 'f1-23-udp';
import { io } from '..';
import { 
  finalClassificationListener,
} from '@src/listeners/f123Client/finalClassification';

export let f123Client: F123UDP | null = null;

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

export const changePortAndAddress = (port: number, address: string) => {
  function startClient(port: number, address: string) {
    f123Client = new F123UDP({
      port: port || 20777,
      address: address || '192.168.1.81',
    });
    f123Client.start();
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
};

export const getDetails = () => {
  return {
    port: f123Client?.port,
    address: f123Client?.address,
  };
};
