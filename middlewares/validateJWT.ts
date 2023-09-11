import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users';

interface IPayload {
	uid: string;
	iat: number;
	exp: number;
}

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la petición',
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY!) as IPayload;
		const user = await User.findById(uid);

		if (!user) {
			return res.status(401).json({
				msg: 'Token no válido - usuario no existe en DB',
			});
		}

		req.body.user = user;
		next();
		
	} catch (error: any) {
		console.log(error);
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({
				msg: 'Token expirado',
			});
		} else {
			return res.status(401).json({
				msg: 'Token no válido',
			});
		}
	}
};

export default validateJWT;
