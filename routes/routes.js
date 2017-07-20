const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');

const passport = require('passport');
const passportService = require('../services/employeePassport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });
	

router.get('/', employeeController.viewAll);
router.get('/view/:id', employeeController.viewSpecific);
router.get('/update/:id', employeeController.viewUpdate);

router.post('/update/:id', employeeController.update);
router.post('/delete/:id', employeeController.delete);


module.exports = router;




