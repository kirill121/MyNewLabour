const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');

router.get('/', employeeController.viewEmployees);
router.get('/add', employeeController.viewAddEmployee);
router.get('/:id', employeeController.viewEmployee);
router.get('/update/:id', employeeController.viewUpdateEmployee);

router.post('/add', employeeController.addEmployee);
router.post('/update/:id', employeeController.updateEmployee);
router.post('/delete/:id', employeeController.deleteEmployee);

module.exports = router;