import mongoose from 'mongoose';

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
		isPublic: {
			type: Boolean,
			default: false
		},
		canEdit: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users'
			}
		],
		canView: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users'
			}
		]
	},
	{ timestamps: true }
);

export default mongoose.model('Kanban', kanbanSchema);
