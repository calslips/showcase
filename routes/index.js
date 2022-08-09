const express = require('express');
const router = express.Router();
const { ensureAuth, ensureUser } = require('../middleware/auth');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureUser, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc    Dashboard page
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard');
});

module.exports = router;