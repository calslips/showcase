const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Authenticate with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google'));

// @desc    Google authentication callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// @desc    Log out user
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;