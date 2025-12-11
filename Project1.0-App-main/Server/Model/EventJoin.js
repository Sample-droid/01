// Model/EventJoin.js
const mongoose = require('mongoose');

const EventJoinSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent the same user from joining the same event twice
EventJoinSchema.index({ user: 1, event: 1 }, { unique: true });

// Optional: automatically add createdAt & updatedAt
EventJoinSchema.set('timestamps', true);



module.exports = mongoose.model('EventJoin', EventJoinSchema);