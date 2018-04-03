const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employer_controller');
const middleware = require('../controllers/rating_function')

const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


router.use('/', requireAuth, (req, res, next) => {
	if (req.user.companyName) {
		next()
	}
	else {
		res.render('wrongAccess', {user: req.user})
	}
})

router.get('/', employerController.viewAll);
router.get('/:id', employerController.viewSpecific)
router.get('/view/:id', employerController.viewSpecific);
router.get('/update/:id', employerController.viewUpdate);
router.get('/:id/employeeView', employerController.viewEmployees);

router.post('/:id/employeeRate', middleware.rating, (req, res, next) => {	
	console.log('Added Rating')
})
router.post('/:id/remove', employerController.remove)
router.post('/hire/:employeeId', employerController.hireEmployee)
router.post('/:id/employeeDelete', employerController.deleteEmployee);
router.post('/update/:id', employerController.update);
router.post('/delete/:id', employerController.delete);


module.exports = router;

