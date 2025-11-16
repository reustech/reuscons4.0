import mongoose from 'mongoose';

const { Schema } = mongoose;

// ✅ SEGÚN SCHEMAS.md: BOARD (Tablero)
const boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  workspace: {
    type: Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
    index: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  members: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    role: {
      type: String,
      enum: ['admin', 'editor', 'viewer'],
      default: 'editor'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  config: {
    background: {
      type: String,
      default: '#0079BF'
    },
    icon: String
  },
  public: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Board', boardSchema);
