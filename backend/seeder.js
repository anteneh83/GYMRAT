const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MembershipPlan = require('./models/MembershipPlan');
const connectDB = require('./config/db');

dotenv.config();

const plans = [
    {
        name: 'Basic Plan',
        price: 500,
        duration: '1 month',
        features: ['Gym Access', 'No personal trainer']
    },
    {
        name: 'Standard Plan',
        price: 1500,
        duration: '1 month',
        features: ['Gym access', '2 trainer sessions per week']
    },
    {
        name: 'Premium Plan',
        price: 3000,
        duration: '1 month',
        features: ['Full trainer access', 'Custom workout plans', 'Nutrition guidance']
    }
];

const seedPlans = async () => {
    try {
        await connectDB();
        await MembershipPlan.deleteMany();
        await MembershipPlan.insertMany(plans);
        console.log('Membership plans seeded successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedPlans();
