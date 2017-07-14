const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employer_controller');

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

	router.get('*', requireAuth, (req, res, next) => {
		next()
	})
	router.get('/', employerController.viewAll);
	router.get('/add', employerController.viewAdd);
	router.get('/view/:id', employerController.viewSpecific);
	router.get('/update/:id', employerController.viewUpdate);
	router.get('/:id/employeeView', employerController.viewEmployees);
	router.get('/:employerId/hireEmployee/:employeeId', employerController.hireEmployee)
	
	router.post('/add', employerController.add);
	router.post('/update/:id', employerController.update);
	router.post('/delete/:id', employerController.delete);


module.exports = router;

