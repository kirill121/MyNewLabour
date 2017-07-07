const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller');
const employerController = require('../controllers/employer_controller');

router.get('/', employeeController.viewEmployees);
router.get('/add', employeeController.viewAddEmployee);
router.get('/:id', employeeController.viewEmployee);
router.get('/update/:id', employeeController.viewUpdateEmployee);

router.post('/add', employeeController.addEmployee);
router.post('/update/:id', employeeController.updateEmployee);
router.post('/delete/:id', employeeController.deleteEmployee);

router.get('/employers', employerController.viewEmployer);
router.get('/employers/add', employerController.viewAddEmployer);
router.get('/employers/:id', employerController.viewEmployer);
router.get('/employers/update/:id', employerController)

router.post('/employers/add', employerController.addEmployers);
router.post('/employers/update/:id', employerController.updateEmployer);
router.post('/delete/:id', employerController.deleteEmployer);

module.exports = router;