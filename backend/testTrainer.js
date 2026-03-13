const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Trainer = require('./models/Trainer');
const connectDB = require('./config/db');

dotenv.config({ path: './.env' });

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
    const trainers = await Trainer.find({}).populate('user');
    console.log("Trainers length: ", trainers.length);
    process.exit();
};
seed();
