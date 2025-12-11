require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// DB connection
const connectDB = require('./Connection/dbconnection');

// Routes
const userRoute = require('./Routes/userRoute');
const adminRoute = require('./Routes/adminRoute');
const eventRoute = require('./Routes/eventRoute'); const donationHistoryRoute = require('./Routes/doantionhistory');

const eventJoinRoute = require('./Routes/eventjoinRoute');
const donationRoute = require('./Routes/donationRoute'); // adjust the path


const app = express();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(helmet());
app.use(morgan('dev'));

// Allow all localhost ports (5173, 5174, 3000, etc.)
app.use(
  cors({
    origin: /http:\/\/localhost:\d+$/,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ------------------------------------------------------------------
   STATIC IMAGE SERVING (IMPORTANT!)
   Fixes broken image issue by:
   ✓ Setting CORP: cross-origin
   ✓ Setting CORS headers
   ✓ Serving images from /uploads/events correctly
------------------------------------------------------------------ */
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(
  '/uploads/events',
  express.static(path.join(__dirname, 'uploads/events'))
);

/* ------------------------------------------------------------------
   ROUTES
------------------------------------------------------------------ */
app.use('/api', eventJoinRoute);

app.use('/api/auth', userRoute);
app.use('/api', adminRoute);

app.use('/api', eventRoute); app.use('/api', donationRoute); 
app.use('/api', donationHistoryRoute);

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: '🎉 Backend is up and running!'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);




});