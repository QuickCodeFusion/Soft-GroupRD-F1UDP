import { Router } from 'express';

import Paths from '../constants/Paths';
import { IReq } from './types/types';
import { IRes } from './types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { changePortAndAddress, getDetails } from './settingsRouter';


// **** Variables **** //

const apiRouter = Router();
const settingsRouter = Router();

// Add UserRouter
apiRouter.get('/', (req: IReq, res: IRes) => {
  res.send( '<h1>Soft-GroupRD-F1UDP</h1>' );
});

settingsRouter.post('/', (req: IReq, res: IRes) => {
  const port: number = parseInt(req.query.port as string) || 20777;
  const address: string = req.query.address as string || '192.168.1.81';

  changePortAndAddress(port, address);
  return res.status(HttpStatusCodes.OK).json('Servidor iniciado en el puerto ' + port);
});

settingsRouter.get('/', (req: IReq, res: IRes) => {
  const details = getDetails();
  return res.status(HttpStatusCodes.OK).json(details);
})

apiRouter.use(Paths.Settings.Base, settingsRouter);


// **** Export default **** //

export default apiRouter;
