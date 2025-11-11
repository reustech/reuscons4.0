import mongoose from 'mongoose';

const filesSchema = new mongoose.Schema(
	{
		filename: {
			type: String,
			required: true
		},
		originalName: {
			type: String,
			required: true
		},
		mimeType: {
			type: String,
			required: true
		},
		size: {
			type: Number,
			required: true
		},
		where: {
			type: String,
			enum: ['task', 'kanban', 'worksite', 'user'],
			required: true
		},
		id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		uploadedAt: {
			type: Date,
			default: Date.now
		},
		description: {
			type: String,
			maxlength: 500
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Files', filesSchema);
