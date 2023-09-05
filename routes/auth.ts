import { Router } from 'express';
import { check } from 'express-validator';
import { loginGoogle } from '../controllers/auth';
const router = Router();

router.post('/google', [check('id_token', 'Id token is required')], loginGoogle);

export default router;
