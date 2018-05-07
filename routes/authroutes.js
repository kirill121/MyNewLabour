const express = require('express');
const router = express.Router();

const passport = require('passport');
const Authentication = require('../controllers/authentication');

require('../services/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/adminView', requireAuth, Authentication.adminView)
router.get('/signup', Authentication.signup)
router.get('/employerSignup', Authentication.employerViewSignup)
router.get('/employeeSignup', Authentication.employeeViewSignup)
router.get('/login', Authentication.viewLogin)
router.get('/logout', Authentication.logout)

router.post('/employerSignup', Authentication.employerSignup)
router.post('/employeeSignup', Authentication.employeeSignup)
router.post('/login', requireLogin, Authentication.login)
router.post('/employees/update/:id', Authentication.employeeUpdate)

module.exports = router;

