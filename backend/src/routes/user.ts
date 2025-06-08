import express, { Request } from 'express';
import { User } from '../models/User';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Middleware to authenticate requests
router.use(authenticateToken);

// Get user data
router.get('/profile', async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update selected cards
router.put('/cards', async (req: AuthRequest, res) => {
  try {
    const { selectedCards } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { selectedCards },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update cards error:', error);
    res.status(500).json({ message: 'Error updating selected cards' });
  }
});

// Update spending analysis
router.put('/spending', async (req: AuthRequest, res) => {
  try {
    const { spendingAnalysis } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { spendingAnalysis },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update spending error:', error);
    res.status(500).json({ message: 'Error updating spending analysis' });
  }
});

export default router; 