import { Router } from 'express';

import Paths from '../constants/Paths';
import { IReq } from './types/types';
import { IRes } from './types/express/misc';


// **** Variables **** //

const apiRouter = Router();

// Add UserRouter
apiRouter.get('/', (req: IReq, res: IRes) => {
  res.send( '<h1>Soft-GroupRD-F1UDP</h1>' );
});


// **** Export default **** //

export default apiRouter;
