import { Schema, model } from 'mongoose';

const campaignSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok']
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'active', 'paused', 'completed']
  },
  budget: {
    total: Number,
    spent: Number,
    currency: String
  },
  metrics: {
    reach: Number,
    engagement: Number,
    conversions: Number,
    roi: Number
  },
  dateRange: {
    start: Date,
    end: Date
  },
  content: [{
    type: {
      type: String,
      enum: ['image', 'video', 'carousel', 'text']
    },
    mediaUrl: String,
    caption: String,
    scheduledTime: Date,
    status: String,
    performance: {
      reach: Number,
      engagement: Number,
      clicks: Number
    }
  }],
  targeting: {
    demographics: {
      ageRange: [Number],
      gender: [String],
      locations: [String]
    },
    interests: [String]
  }
}, {
  timestamps: true
});

export const Campaign = model('Campaign', campaignSchema);