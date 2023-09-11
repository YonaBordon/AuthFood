import express, { Application } from 'express';
import cors from 'cors';

import authRoute from '../routes/auth';
import recipeRoute from '../routes/recipes';
import favouritesRoute from '../routes/favourites';

import mongoDBConnection from '../database/config';

class Server {
	private app: Application;
	private port: string | number;
	private apiPaths = {
		auth: '/api/auth',
		favourites: '/api/favourites',
		recipe: '/api/recipe',
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT ?? 3000;

		this.conectionDB();
		this.middlewares();
		this.routes();
	}

	async conectionDB() {
		// Conectar a base de datos
		await mongoDBConnection();
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}

	routes() {
		this.app.use(this.apiPaths.auth, authRoute);
		this.app.use(this.apiPaths.favourites, favouritesRoute);
		this.app.use(this.apiPaths.recipe, recipeRoute);
	}

	middlewares() {
		// CORS
		this.app.use(cors());
		// Lectura del body
		this.app.use(express.json());
		// Public folder
		this.app.use(express.static('public'));
	}
}

export default Server;
