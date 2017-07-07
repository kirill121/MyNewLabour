function routerBuilder(controller) {	
	const express = require('express');
	const router = express.Router();

	router.get('/', controller.viewAll);
	router.get('/add', controller.viewAdd);
	router.get('/:id', controller.viewSpecific);
	router.get('/update/:id', controller.viewUpdate);

	router.post('/add', controller.add);
	router.post('/update/:id', controller.update);
	router.post('/delete/:id', controller.delete);

	return router;
}

module.exports = routerBuilder;

