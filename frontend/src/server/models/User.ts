import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  socialAccounts: [{
    platform: String,
    accessToken: String,
    refreshToken: String,
    platformUserId: String,
    connected: Boolean
  }],
  settings: {
    notifications: {
      email: Boolean,
      push: Boolean,
      sms: Boolean
    },
    timezone: String,
    language: String
  },
  subscription: {
    plan: String,
    status: String,
    validUntil: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model('User', userSchema);