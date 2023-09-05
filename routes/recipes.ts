import { Router } from 'express';
import validateJWT from '../middlewares/validateJWT';
import { check } from 'express-validator';
import { createRecipe } from '../controllers/recipes';

const router = Router();

router.post(
	'/',
	[validateJWT, check('name', 'The name is required').not().isEmpty()],
	createRecipe,
);

export default router;
