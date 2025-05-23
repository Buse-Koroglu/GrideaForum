const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

router.get('/create', isAuthenticated, noteController.showCreateNote);
router.post('/create', isAuthenticated, noteController.createNote);
router.get('/print', isAuthenticated, noteController.showCreateNote);
router.get('/edit/:id', isAuthenticated, noteController.getEditPostPage);
router.post('/edit/:id', isAuthenticated, noteController.updateNote);

module.exports = router;
