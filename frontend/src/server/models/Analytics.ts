import { Schema, model } from 'mongoose';

const analyticsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  metrics: {
    followers: Number,
    engagement: Number,
    reach: Number,
    impressions: Number,
    clicks: Number,
    conversions: Number
  },
  demographics: {
    age: [{
      range: String,
      percentage: Number
    }],
    gender: [{
      type: String,
      percentage: Number
    }],
    locations: [{
      name: String,
      count: Number
    }]
  },
  posts: [{
    postId: String,
    type: String,
    reach: Number,
    engagement: Number,
    clicks: Number
  }]
}, {
  timestamps: true
});

// Index for efficient querying
analyticsSchema.index({ userId: 1, platform: 1, date: 1 });

export const Analytics = model('Analytics', analyticsSchema);