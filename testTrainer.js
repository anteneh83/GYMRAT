const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./backend/models/User');
const Trainer = require('./backend/models/Trainer');
const connectDB = require('./backend/config/db');

dotenv.config({ path: './backend/.env' });

const seed = async () => {
    await connectDB();
    const user = await User.create({
        name: 'Test Trainer 2',
        email: 'testtrainer2@gym.com',
        password: 'password123',
        role: 'trainer'
    });
    await Trainer.create({
        user: user._id,
        specialization: ['Yoga'],
        experience: 5,
        bio: 'Test trainer 2 bio'
    });
    console.log('Done');
    process.exit();
};
seed();
