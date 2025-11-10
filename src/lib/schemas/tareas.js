import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema(
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
		uploadedAt: {
			type: Date,
			default: Date.now
		},
		uploadedBy: String,
		url: String
	},
	{ _id: false }
);

const tareasSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 100
		},
		description: {
			type: String,
			maxlength: 500,
			default: null
		},
		kanban_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Kanban',
			required: true
		},
		column: {
			type: String,
			required: true
		},
		userId: String,
		priority: {
			type: String,
			enum: ['low', 'medium', 'high'],
			default: 'medium'
		},
		order: {
			type: Number,
			default: 0
		},
		attachments: {
			type: [attachmentSchema],
			default: []
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Tareas', tareasSchema);
