const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Entry = require('../models/Entry');

// @desc    Display all public entries
// @route   GET /entries
router.get('/', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry
      .find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();
    res.render('entries/index', {
      entries,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// @desc    Display single entry
// @route   GET /entries/:entryId
router.get('/:entryId', ensureAuth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId)
      .populate('user')
      .lean();
    if (!entry) {
      return res.render('error/404');
    }
    res.render('entries/display', {
      entry,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.render('error/404');
  }
});

// @desc    Display add entry page
// @route   GET /entries/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('entries/add');
});

// @desc    Display edit entry page
// @route   GET /entries/edit/:entryId
router.get('/edit/:entryId', ensureAuth, async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.entryId }).lean();
    if (!entry) {
      return res.render('error/404');
    }
    if (entry.user.toString() !== req.user._id.toString()) {
      res.redirect('/entries');
    } else {
      res.render('entries/edit', { entry });
    }
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// @desc    Display a User's collection of public entries
// @route   GET /entries/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry
      .find({
        status: 'public',
        user: req.params.userId,
      })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();
    res.render('entries/index', {
      entries,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
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

// @desc    Process entry update
// @route   PUT /entries/:entryId
router.put('/:entryId', ensureAuth, async (req, res) => {
  try {
    let entry = await Entry.findById(req.params.entryId).lean();
    if (!entry) {
      return res.render('error/404');
    }
    if (entry.user.toString() !== req.user._id.toString()) {
      res.redirect('/entries');
    } else {
      entry = await Entry.findOneAndUpdate({ _id: req.params.entryId }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect('/dashboard');
    }
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// @desc    Delete entry
// @route   DELETE /entries/:entryId
router.delete('/:entryId', ensureAuth, async (req, res) => {
  try {
    await Entry.deleteOne({ _id: req.params.entryId });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;