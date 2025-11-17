import mongoose from 'mongoose';

const { Schema } = mongoose;

// ✅ SEGÚN SCHEMAS.md: FILE (Archivo)
const fileSchema = new Schema({
  name: {
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
    required: true // in bytes
  },
  path: {
    type: String,
    required: true // local path or S3
  },
  url: {
    type: String,
    required: true // public URL to download
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  resourceType: {
    type: String,
    enum: ['card', 'board', 'user', 'other'],
    default: 'other',
    index: true
  },
  resourceId: {
    type: Schema.Types.ObjectId, // Dynamic reference (polymorphic)
    index: true
  },
  // File metadata
  extension: {
    type: String // e.g.: 'pdf', 'jpg', 'png'
  }
}, {
  timestamps: true
});

export default mongoose.model('File', fileSchema);
