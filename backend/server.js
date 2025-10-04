require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const redis = require('redis');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const voucherRoutes = require('./routes/vouchers');
const bookingRoutes = require('./routes/bookings');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/bookings', bookingRoutes);
