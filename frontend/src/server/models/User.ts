import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please provide a valid email address'], // Email validation
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long'], // Minimum length for passwords
    },
    industry: {
      type: String,
      required: true,
    },
    socialAccounts: [
      {
        platform: {
          type: String,
          enum: ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'google'], // Controlled list of platforms
        },
        accessToken: {
          type: String,
        },
        refreshToken: {
          type: String,
        },
        platformUserId: {
          type: String,
        },
        connected: {
          type: Boolean,
          default: false,
        },
      },
    ],
    settings: {
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: false },
        sms: { type: Boolean, default: false },
      },
      timezone: {
        type: String,
        default: 'UTC', // Default timezone
      },
      language: {
        type: String,
        default: 'en', // Default language
      },
    },
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'basic', 'premium'], // Controlled subscription plans
        default: 'free',
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled', 'expired'],
        default: 'inactive',
      },
      validUntil: {
        type: Date,
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Index for efficient querying
userSchema.index({ email: 1 }); // Ensure quick email lookups
userSchema.index({ 'socialAccounts.platform': 1, 'socialAccounts.connected': 1 }); // Query for connected accounts

export const User = model('User', userSchema);
