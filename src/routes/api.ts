import { Router } from 'express';

import Paths from '../constants/Paths';
import { IReq } from './types/types';
import { IRes } from './types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { changePortAndAddress, getDetails, restartClient } from './settingsRouter';

// **** Variables **** //

const apiRouter = Router();
const settingsRouter = Router();

// Add BaseRouter
apiRouter.get('/', (req: IReq, res: IRes) => {
  try {
    res.send( '<h1>Soft-GroupRD-F1UDP</h1>' );
  } catch (error) {
    if (error instanceof Error) {      
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
        message: error.message,
      });
    }
  }
});

// Add settingsRouter
settingsRouter.post('/', (req: IReq, res: IRes) => {
  const port: number =
    parseInt(req.query.port as string) || 20777;
  const address: string =
    req.query.address as string || '192.168.1.81';

  try {
    changePortAndAddress(port, address);
    res.status(HttpStatusCodes.OK).json(
      'Servidor iniciado en el puerto ' + port,
    );
  } catch (error) {
    if (error instanceof Error) {   
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
        message: error.message,
      });
    }
  }
});

settingsRouter.get('/', (req: IReq, res: IRes) => {
  try {
    const details = getDetails();
    res.status(HttpStatusCodes.OK).json(details);
  } catch (error) {
    if (error instanceof Error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
        message: error.message,
      });
    }
  }
});

settingsRouter.post(Paths.Settings.Restart, (_: IReq, res: IRes) => {
  try {
    restartClient();
    res.status(HttpStatusCodes.OK).json('Servidor reiniciado');
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
        message: error.message,
      });
    }
  }
});

apiRouter.use(Paths.Settings.Base, settingsRouter);


// **** Export default **** //

export default apiRouter;
