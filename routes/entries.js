const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Entry = require('../models/Entry');

// @desc    Display add entry page
// @route   GET /entries/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('entries/add');
});

// @desc    Process form to add entry
// @route   POST /entries
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user._id;
    await Entry.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;