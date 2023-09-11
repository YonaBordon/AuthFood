import { Router } from 'express';
import validateJWT from '../middlewares/validateJWT';
import { createFavourite, deleteFavourite, getFavourites } from '../controllers/favourites';

const router = Router();

router.get('/', validateJWT, getFavourites);

router.post('/', validateJWT, createFavourite);

router.delete('/:id', validateJWT, deleteFavourite);

export default router;
