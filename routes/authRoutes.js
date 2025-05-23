const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');


router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');  
});

router.get('/print', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('print');
});

router.get('/veri', (req, res) => {
  res.render('veri'); 
});


router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;  