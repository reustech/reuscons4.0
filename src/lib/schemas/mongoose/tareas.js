import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema(
	{
		fileId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Files'
		},
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
		columnId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Columns',
			required: true
		},
		kanbanId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Kanban'
		},
		worksiteId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Worksites'
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users'
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high'],
			default: 'medium'
		},
		attachments: {
			type: [attachmentSchema],
			default: []
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Tasks', tareasSchema);
