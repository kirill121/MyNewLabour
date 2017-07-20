const express = require('express');
const router = express.Router();

const passport = require('passport');
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/signup', Authentication.signup)
router.get('/employerSignup', Authentication.employerViewSignup)
router.get('/employeeSignup', Authentication.employeeViewSignup)
router.get('/login', Authentication.viewLogin)
router.get('/logout', Authentication.logout)


router.post('/employerSignup', Authentication.employerSignup)
router.post('/employeeSignup', Authentication.employeeSignup)
router.post('/login', requireLogin, Authentication.login)

module.exports = router;

