import { Schema, model } from 'mongoose';

const FavouritesSchema = new Schema({
	label: {
		type: String,
		required: [true, 'The name is required'],
	},
	image: {
		type: String,
		required: [true, 'The image is required'],
	},
	href: {
		type: String,
		required: [true, 'The href is required'],
	},
	calories: {
		type: String,
		required: [true, 'The calories are required'],
	},
	totalTime: {
		type: String,
		required: [true, 'The cooking time is required'],
	},
});

FavouritesSchema.methods.toJSON = function () {
	const { __v, ...favourites } = this.toObject();
	return favourites;
};

const Favourites = model('Favourites', FavouritesSchema);

export default Favourites;
