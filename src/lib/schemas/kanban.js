import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			maxlength: 50
		},
		title: {
			type: String,
			required: true,
			maxlength: 50
		},
		color: {
			type: String,
			required: true,
			match: /^#[0-9A-Fa-f]{6}$/
		},
		order: {
			type: Number,
			required: true
		}
	},
	{ _id: false }
);

const kanbanSchema = new mongoose.Schema(
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
		columns: {
			type: [columnSchema],
			required: true
		},
		isPublic: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Kanban', kanbanSchema);
