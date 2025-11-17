import mongoose from 'mongoose';

const { Schema } = mongoose;

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
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
      enum: ['admin', 'member'],
      default: 'member'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  boards: [{
    type: Schema.Types.ObjectId,
    ref: 'Board',
    index: true
  }],
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'File',
    index: true
  }],
  config: {
    color: {
      type: String,
      default: '#0079BF'
    },
    icon: String
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Workspace', workspaceSchema);
