// Routes/EventJoinRoute.js
const express = require('express');
const router = express.Router();
const EventJoin = require('../Model/EventJoin');
const Event = require('../Model/Event');
const User = require('../Model/user'); // ✅ ensure case matches actual filename

// -------------------- JOIN EVENT --------------------
router.post('/join-event', async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    console.log("Incoming join request:", { userId, eventId });

    if (!userId || !eventId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Event ID are required',
      });
    }

    const event = await Event.findById(eventId);
    console.log("Event found:", event ? event.name : "NOT FOUND");
    if (!event)
      return res.status(404).json({ success: false, message: 'Event not found' });

    const user = await User.findById(userId);
    console.log("User found:", user ? user.name : "NOT FOUND");
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    const existingJoin = await EventJoin.findOne({ user: userId, event: eventId });
    console.log("Existing join:", !!existingJoin);
    if (existingJoin)
      return res.status(400).json({
        success: false,
        message: 'You have already joined this event',
      });

    const join = new EventJoin({ user: userId, event: eventId });
    await join.save();

    console.log("Join created successfully:", join);

    res.status(201).json({
      success: true,
      message: 'Successfully joined the event',
      join,
    });
  } catch (error) {
    console.error('Join Event Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// -------------------- FORFEIT (LEAVE) EVENT --------------------
// ✅ Must come before any /:param route definitions
router.delete('/forfeit-event', async (req, res) => {
  try {
    // Axios sends body in "data" for DELETE requests
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Event ID are required',
      });
    }

    const existingJoin = await EventJoin.findOne({ user: userId, event: eventId });
    if (!existingJoin) {
      return res.status(404).json({
        success: false,
        message: 'You have not joined this event yet',
      });
    }

    await EventJoin.deleteOne({ _id: existingJoin._id });

    console.log(`User ${userId} forfeited event ${eventId}`);

    res.status(200).json({
      success: true,
      message: 'Successfully forfeited from the event',
    });
  } catch (error) {
    console.error('Forfeit Event Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// -------------------- FETCH JOINED EVENTS --------------------
router.get('/joined/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const joinedEvents = await EventJoin.find({ user: userId })
      .populate('event')
      .populate('user', 'username email role');

    res.status(200).json({
      success: true,
      message: 'Joined events fetched successfully',
      joinedEvents,
    });
  } catch (error) {
    console.error('Fetch Joined Events Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// -------------------- CHECK SPECIFIC JOIN --------------------
router.get('/joined/:userId/:eventId', async (req, res) => {
  try {
    const { userId, eventId } = req.params;
    const existingJoin = await EventJoin.findOne({ user: userId, event: eventId });
    res.status(200).json({ success: true, joined: !!existingJoin });
  } catch (error) {
    console.error('Check Join Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
module.exports = router;