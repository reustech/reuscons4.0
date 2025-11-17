import mongoose from 'mongoose';

const { Schema } = mongoose;

// ✅ SEGÚN SCHEMAS.md: CARD (Tarjeta)
const cardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
    index: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }],
  watchers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  labels: [{
    name: {
      type: String
    },
    color: {
      type: String // Hexadecimal color
    }
  }],
  status: {
    type: String,
    enum: ['open', 'in_progress', 'blocked', 'completed', 'archived'],
    default: 'open',
    index: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  startDate: {
    type: Date
  },
  position: {
    type: Number,
    default: 0,
    index: true
  },
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'File'
  }],
  subtasks: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    completed: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    assigned: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    dueDate: {
      type: Date
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
}, {
  timestamps: true
});

export default mongoose.model('Card', cardSchema);
