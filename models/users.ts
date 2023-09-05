const { Schema, model } = require('mongoose');

const userSchema = Schema({
	name: {
		type: String,
		required: [true, 'The name is required'],
	},
	email: {
		type: String,
		required: [true, 'The email is required'],
		unique: true,
	},
	img: {
		type: String,
	},
});

userSchema.methods.toJSON = function () {
	const { __v, password, ...user } = this.toObject();
	return user;
};

const User = model('User', userSchema);

export default User;
