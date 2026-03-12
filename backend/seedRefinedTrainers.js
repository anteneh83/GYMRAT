const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Trainer = require('./models/Trainer');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();

const trainersData = [
    {
        name: 'Marcus Thorne',
        email: 'marcus@gymrat.com',
        specialization: ['Bodybuilding', 'Strength Training'],
        experience: 12,
        bio: 'Former competitive bodybuilder with a focus on hypertrophy and safe lifting techniques. I push you to find your true limits.',
        image: 'trainer_1' // Will mapping to the generated filename
    },
    {
        name: 'Elena Rodriguez',
        email: 'elena@gymrat.com',
        specialization: ['HIIT', 'Functional Fitness', 'Yoga'],
        experience: 7,
        bio: 'Specialist in movement efficiency and endurance. My sessions are high energy and designed to scorch calories while building lean muscle.',
        image: 'trainer_2'
    },
    {
        name: 'Vasilis "The Tank" Kostas',
        email: 'vasilis@gymrat.com',
        specialization: ['Powerlifting', 'Olympic Lifting'],
        experience: 15,
        bio: 'Powerlifting state champion. I specialize in the big three: Squat, Bench, and Deadlift. Strength is the foundation of everything.',
        image: 'trainer_3'
    }
];

const seedRefinedTrainers = async () => {
    try {
        await connectDB();
        await Trainer.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt);

        for (const t of trainersData) {
            let user = await User.findOne({ email: t.email });
            if (!user) {
                user = await User.create({
                    name: t.name,
                    email: t.email,
                    password: password,
                    role: 'trainer'
                });
            }

            await Trainer.create({
                user: user._id,
                specialization: t.specialization,
                experience: t.experience,
                bio: t.bio,
                rating: 4.8 + Math.random() * 0.2, // Realistic initial rating
                schedule: {
                    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    availableHours: { start: '06:00', end: '20:00' },
                    maxTraineesPerSession: 5
                }
            });
        }

        console.log('Refined trainers seeded successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedRefinedTrainers();
