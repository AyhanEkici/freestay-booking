require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { Pool } = require('pg');
const redis = require('redis');

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Initialize Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const voucherRoutes = require('./routes/vouchers');
const bookingRoutes = require('./routes/bookings');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/bookings', bookingRoutes);

// Root route - serve a proper response
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Freestay Booking Platform</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .container { max-width: 800px; margin: 0 auto; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Freestay Booking Platform</h1>
        <p>Your advanced hotel booking platform with voucher management is running!</p>
        <p>API endpoints available at: <code>/api/...</code></p>
        <p>Frontend will be served here in production mode.</p>
      </div>
    </body>
    </html>
  `);
});

// Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    await redisClient.ping();
    res.status(200).json({ 
      status: 'healthy', 
      database: 'connected', 
      redis: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy', 
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, pool, redisClient };
