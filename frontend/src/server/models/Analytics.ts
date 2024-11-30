import { Schema, model } from 'mongoose';

const analyticsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    platform: {
      type: String,
      required: true,
      enum: ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'other'], // Ensure consistency
    },
    date: {
      type: Date,
      required: true,
    },
    metrics: {
      followers: { type: Number, default: 0 },
      engagement: { type: Number, default: 0 },
      reach: { type: Number, default: 0 },
      impressions: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      conversions: { type: Number, default: 0 },
    },
    demographics: {
      age: [
        {
          range: { type: String, required: true },
          percentage: { type: Number, required: true },
        },
      ],
      gender: [
        {
          type: { type: String, required: true },
          percentage: { type: Number, required: true },
        },
      ],
      locations: [
        {
          name: { type: String, required: true },
          count: { type: Number, required: true },
        },
      ],
    },
    posts: [
      {
        postId: { type: String, required: true },
        type: { type: String, enum: ['image', 'video', 'text', 'carousel'], required: true },
        reach: { type: Number, default: 0 },
        engagement: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Efficient querying
analyticsSchema.index({ userId: 1, platform: 1, date: 1 }); // Combination for targeted queries
analyticsSchema.index({ platform: 1, 'metrics.engagement': -1 }); // For leaderboard or ranking queries
analyticsSchema.index({ 'posts.postId': 1 }); // For fetching individual post metrics

export const Analytics = model('Analytics', analyticsSchema);
