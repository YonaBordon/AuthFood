import jwt from 'jsonwebtoken';

const generateJWT = (uid: string, userName: string) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, userName };

		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY!,

			{
				expiresIn: '30m',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject(new Error('No se pudo generar el JWT'));
				} else {
					resolve(token!);
				}
			},
		);
	});
};

export default generateJWT;
