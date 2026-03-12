const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/memberships', require('./routes/membershipRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/trainers', require('./routes/trainerRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Default Route
app.get('/', (req, res) => {
    res.send('Gym Platform API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
