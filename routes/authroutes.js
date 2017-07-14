const express = require('express');
const router = express.Router();

const User = require('../models/user')

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/signup', Authentication.viewSignup)
router.get('/login', Authentication.viewLogin)
router.get('/logout', Authentication.logout)
router.get('/')


router.post('/signup', Authentication.signup)
router.post('/login', requireLogin, Authentication.login)

module.exports = router;

