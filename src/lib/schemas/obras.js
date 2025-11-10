import mongoose from 'mongoose';

const obrasSchema = new mongoose.Schema(
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
			required: true,
			maxlength: 100
		},
		address: {
			type: String,
			required: true,
			maxlength: 200
		},
		client: {
			type: String,
			required: true,
			maxlength: 100
		},
		status: {
			type: String,
			enum: ['planning', 'in-progress', 'on-hold', 'completed', 'cancelled'],
			default: 'planning'
		},
		team: {
			type: [String],
			default: []
		},
		admin: {
			type: [String],
			default: []
		},
		kanban_id: {
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

export default mongoose.model('Obras', obrasSchema);
