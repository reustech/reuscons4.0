import mongoose from 'mongoose';

const archivosSchema = new mongoose.Schema(
	{
		filename: {
			type: String,
			required: true
		},
		originalName: {
			type: String,
			required: true
		},
		mimetype: {
			type: String,
			required: true
		},
		size: {
			type: Number,
			required: true
		},
		userId: String,
		kanbanId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Kanban'
		},
		taskId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tareas'
		},
		uploadDate: {
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

export default mongoose.model('Archivos', archivosSchema);
