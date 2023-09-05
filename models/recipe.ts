import { Schema, model } from 'mongoose';

const RecipeSchema = new Schema({
	name: {
		type: String,
		required: [true, 'The name is required'],
	},
	// list of ingredients
	ingredients: {
		type: [String],
		required: [true, 'The ingredients are required'],
	},
	description: {
		type: String,
		required: [true, 'The description is required'],
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

RecipeSchema.methods.toJSON = function () {
	const { __v, ...recipe } = this.toObject();
	return recipe;
};

const Recipe = model('Recipe', RecipeSchema);

export default Recipe;
