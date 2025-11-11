import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			maxlength: 50
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'moderator'],
			default: 'user'
		},
		isActive: {
			type: Boolean,
			default: true
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Users', usersSchema);
