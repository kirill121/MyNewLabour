const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');

	router.get('/', employeeController.viewAll);
	router.get('/add', employeeController.viewAdd);
	router.get('/view/:id', employeeController.viewSpecific);
	router.get('/update/:id', employeeController.viewUpdate);

	router.post('/add', employeeController.add);
	router.post('/update/:id', employeeController.update);
	router.post('/delete/:id', employeeController.delete);


module.exports = router;




