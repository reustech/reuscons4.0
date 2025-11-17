import mongoose from 'mongoose';

const { Schema } = mongoose;

// ✅ SEGÚN SCHEMAS.md: USER (Usuario)
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    select: false // Don't include in queries by default
  },
  profile: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    zipCode: {
      type: String
    },
    phone: {
      type: String
    },
    mobile: {
      type: String
    },
    company: {
      type: String
    },
    position: {
      type: String
    },
    website: {
      type: String // URL
    }
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Mongoose automatically manages createdAt and updatedAt
});

export default mongoose.model('User', userSchema);
