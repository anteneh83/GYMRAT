const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const password = 'admin123';

        const email = 'admin@gym.com';
        const adminExists = await User.findOne({ email });

        if (adminExists) {
            adminExists.role = 'admin';
            adminExists.password = password;
            await adminExists.save();
            console.log('Existing user updated to admin role');
        } else {
            await User.create({
                name: 'System Admin',
                email: email,
                password: password,
                role: 'admin'
            });
            console.log('Admin user created successfully');
        }

        console.log('Admin Email: admin@gym.com');
        console.log('Admin Password: admin123');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
