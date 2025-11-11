import mongoose from 'mongoose';

const worksitesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 100
		},
		description: {
			type: String,
			maxlength: 500,
			default: null
		},
		location: {
			type: String,
			maxlength: 100
		},
		address: {
			type: String,
			maxlength: 200
		},
		client: {
			type: String,
			maxlength: 100
		},
		status: {
			type: String,
			enum: ['planning', 'in-progress', 'on-hold', 'completed', 'cancelled'],
			default: 'planning'
		},
		team: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users'
			}
		],
		admin: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users'
			}
		],
		kanbanId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Kanban'
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high'],
			default: 'medium'
		},
		notes: {
			type: String,
			maxlength: 1000
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Worksites', worksitesSchema);
