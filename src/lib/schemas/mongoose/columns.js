import mongoose from 'mongoose';

const columnsSchema = new mongoose.Schema(
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
		},
		kanbanId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Kanban',
			required: true
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Columns', columnsSchema);
