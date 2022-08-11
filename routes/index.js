const express = require('express');
const router = express.Router();
const { ensureAuth, ensureUser } = require('../middleware/auth');
const Entry = require('../models/Entry');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureUser, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc    Dashboard page
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id }).lean();
    res.render('dashboard', {
      name: req.user.firstName,
      entries,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;