import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const router = Router();

const resources = { users: User, teams: Team, activities: Activity, workouts: Workout };

for (const [path, model] of Object.entries(resources)) {
  router.get(`/${path}`, async (_request, response, next) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }).lean());
    } catch (error) {
      next(error);
    }
  });

  router.post(`/${path}`, async (request, response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });
}

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const entries = await Leaderboard.find()
      .sort({ points: -1 })
      .populate('user', 'username displayName avatarUrl')
      .lean();
    response.json(entries.map((entry, index) => ({ ...entry, rank: index + 1 })));
  } catch (error) {
    next(error);
  }
});

router.post('/leaderboard', async (request, response, next) => {
  try {
    const entry = await Leaderboard.findOneAndUpdate(
      { user: request.body.user },
      { $set: { points: request.body.points } },
      { new: true, upsert: true, runValidators: true },
    );
    response.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

export default router;