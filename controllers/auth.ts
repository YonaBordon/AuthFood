import { Request, Response } from 'express';

import User from '../models/users';
import googleVerify from '../helpers/google-verify';
import generateJWT from '../helpers/generate-jwt';

export const loginGoogle = async (req: Request, res: Response) => {
	const { id_token } = req.body;

	try {
		const { name, email, img } = await googleVerify(id_token);
		console.log('Controlador', name);
		let user = await User.findOne({ email });

		if (!user) {
			const data = {
				name,
				email,
				img,
			};

			user = new User(data);
			await user.save();
		}

		// generate JWT
		const token = await generateJWT(user.id, user.name);

		res.json({
			msg: 'Google Signin',
			data: user,
			token,
		});
	} catch (error) {
		res.status(400).json({
			msg: 'Token de Google no válido',
		});
	}
};
