const mongoose = require('mongoose');

const workoutProgramSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    exercises: [
        {
            name: String,
            sets: Number,
            reps: Number,
            duration: String,
            instructions: String
        }
    ],
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    goal: String
}, {
    timestamps: true
});

const WorkoutProgram = mongoose.model('WorkoutProgram', workoutProgramSchema);

module.exports = WorkoutProgram;
