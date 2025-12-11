const express = require('express');
const router = express.Router();
const Event = require('../Model/Event');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// -------------------- MULTER SETUP --------------------
const uploadDir = path.join(__dirname, '..', 'uploads', 'events');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// -------------------- CREATE EVENT --------------------
router.post('/event', upload.single('image'), async (req, res, next) => {
  try {
    const { name, code, date, location, description, category, user } = req.body;

    if (!name || !code || !date || !location || !category || !user) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Event image is required',
      });
    }

    if (code.length !== 8) {
      return res.status(400).json({ success: false, message: 'Event code must be 8 characters' });
    }

    const existingEvent = await Event.findOne({ code });
    if (existingEvent) {
      return res.status(400).json({ success: false, message: 'Event code already exists' });
    }

    const imagePath = `uploads/events/${req.file.filename}`;

    const newEvent = new Event({
      name,
      code,
      date: new Date(date),
      location,
      description: description || '',
      category,
      user,
      image: imagePath,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: savedEvent,
    });
  } catch (error) {
    next(error);
  }
});

// -------------------- GET ALL EVENTS --------------------
router.get('/events', async (req, res, next) => {
  try {
    const events = await Event.find()
      .select('name code date location description category image user')
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: 'All events retrieved successfully',
      events,
    });
  } catch (error) {
    next(error);
  }
});

// -------------------- GET EVENT BY ID --------------------
router.get('/events/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).select(
      'name code date location description category image user'
    );

    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, message: 'Event retrieved', event });
  } catch (error) {
    next(error);
  }
});

// -------------------- GET EVENTS BY USER --------------------
router.get('/events/user/:userid', async (req, res, next) => {
  try {
    const events = await Event.find({ user: req.params.userid })
      .select('name code date location description category image')
      .sort({ date: 1 });

    res.status(200).json({ success: true, message: 'Events retrieved', events });
  } catch (error) {
    next(error);
  }
});

// -------------------- GET EVENT BY CODE --------------------
router.get('/event/code/:code', async (req, res, next) => {
  try {
    const event = await Event.findOne({ code: req.params.code }).select(
      'name code date location description category image user'
    );

    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, message: 'Event retrieved', event });
  } catch (error) {
    next(error);
  }
});

// -------------------- UPDATE EVENT --------------------
router.put('/event/:id', upload.single('image'), async (req, res, next) => {
  try {
    const { name, date, location, description, category } = req.body;
    const updateData = { name, date, location, description, category };

    // ✅ Update image if uploaded
    if (req.file) {
      updateData.image = `uploads/events/${req.file.filename}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) return res.status(404).json({ success: false, message: 'Event not found' });

    res.status(200).json({ success: true, message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    next(error);
  }
});

// -------------------- DELETE EVENT --------------------
router.delete('/event/:id', async (req, res, next) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) return res.status(404).json({ success: false, message: 'Event not found' });

    if (deletedEvent.image) {
      const imgPath = path.join(__dirname, '..', deletedEvent.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;