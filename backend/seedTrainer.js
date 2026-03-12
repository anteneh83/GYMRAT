const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Trainer = require('./models/Trainer');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedTrainers = async () => {
    try {
        await connectDB();

        // Create a trainer user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        let trainerUser = await User.findOne({ email: 'trainer1@gym.com' });
        if (!trainerUser) {
            trainerUser = await User.create({
                name: 'Victor Doom',
                email: 'trainer1@gym.com',
                password: hashedPassword,
                role: 'trainer'
            });
        }

        await Trainer.deleteMany();
        await Trainer.create({
            user: trainerUser._id,
            specialization: ['Weightlifting', 'Powerlifting'],
            experience: 8,
            bio: 'Expert in strength training and muscle building.',
            schedule: {
                availableDays: ['Monday', 'Wednesday', 'Friday'],
                availableHours: { start: '08:00', end: '12:00' },
                maxTraineesPerSession: 3
            }
        });

        console.log('Trainer seeded successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedTrainers();
