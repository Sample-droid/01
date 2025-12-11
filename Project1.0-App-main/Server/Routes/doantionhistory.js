const express = require('express');
const router = express.Router();
const Donation = require('../Model/Donation');

const verifyToken = require('../middleware/auth'); // Middleware to validate JWT

// GET /api/donations/history?page=1&limit=10
router.get('/donations/history', verifyToken, async (req, res) => {
  try {
    const email = req.user.email; // from JWT token
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalDocs = await Donation.countDocuments({ email });
    const totalPages = Math.ceil(totalDocs / limit);
const donations = await Donation.find({ email })
      
.sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      donations,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donation history' });
  }
});


module.exports = router;