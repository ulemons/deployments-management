import Router from 'koa-router';
import { TokenController } from '../controllers/token-controller';

const router = new Router();

router.get(`/token`, TokenController.getToken);

export default router;
