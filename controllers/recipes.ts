import { Request, Response } from 'express';
import Recipe from '../models/recipe';

export const createRecipe = async (req: Request, res: Response) => {
	const { name, description, ingredients } = req.body;

	try {
		const recipe = await Recipe.findOne({ name }).exec();

		if (recipe) {
			return res.status(400).json({
				msg: 'Recipe already exists',
			});
		}

		const data = {
			name,
			description,
			ingredients,
			user: req.body.user._id,
		};

		const newRecipe = new Recipe(data);
		await newRecipe.save();

		res.status(201).json({ msg: 'Create recipe', data: newRecipe });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error' + error,
		});
	}
};
