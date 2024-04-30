import { Router } from 'express';

import Paths from '../constants/Paths';
import { IReq } from './types/types';
import { IRes } from './types/express/misc';


// **** Variables **** //

const apiRouter = Router();

// Add UserRouter
apiRouter.use(Paths.Base, (req: IReq, res: IRes) => {
  res.send( 'Hello World!' );
});


// **** Export default **** //

export default apiRouter;
