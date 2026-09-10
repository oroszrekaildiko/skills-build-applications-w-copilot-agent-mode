import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex.runner',
        email: 'alex.runner@mergington.edu',
        displayName: 'Alex Rivera',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'jordan.strength',
        email: 'jordan.strength@mergington.edu',
        displayName: 'Jordan Lee',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        username: 'sam.cyclist',
        email: 'sam.cyclist@mergington.edu',
        displayName: 'Sam Patel',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
      {
        username: 'taylor.active',
        email: 'taylor.active@mergington.edu',
        displayName: 'Taylor Brooks',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
    ]);

    await Team.create([
      {
        name: 'Trailblazers',
        description: 'Weekend runners and outdoor explorers.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Power Squad',
        description: 'Strength and conditioning enthusiasts.',
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Running', durationMinutes: 35, points: 70 },
      { user: users[1]._id, type: 'Strength training', durationMinutes: 45, points: 90 },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 50, points: 100 },
      { user: users[3]._id, type: 'Walking', durationMinutes: 30, points: 45 },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 420, rank: 1 },
      { user: users[1]._id, points: 360, rank: 2 },
      { user: users[2]._id, points: 315, rank: 3 },
      { user: users[3]._id, points: 260, rank: 4 },
    ]);

    await Workout.create([
      {
        name: 'Easy Start Run',
        description: 'A steady run to build endurance and confidence.',
        difficulty: 'beginner',
        durationMinutes: 25,
        target: 'Cardio',
      },
      {
        name: 'Full Body Circuit',
        description: 'A balanced circuit using bodyweight strength movements.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        target: 'Strength',
      },
      {
        name: 'Speed Intervals',
        description: 'Short, challenging intervals to improve running speed.',
        difficulty: 'advanced',
        durationMinutes: 30,
        target: 'Cardio',
      },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
