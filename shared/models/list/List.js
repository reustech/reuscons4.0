import mongoose from 'mongoose';

const { Schema } = mongoose;

// ✅ SEGÚN SCHEMAS.md: LIST (Columna/Lista)
const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
    index: true
  },
  position: {
    type: Number,
    default: 0,
    index: true
  },
  config: {
    color: {
      type: String,
      default: '#0079BF' // Hexadecimal color
    }
  },
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('List', listSchema);
