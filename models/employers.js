const mongoose = require('mongoose');

const Schema = mongoose.Schema

const EmployerSchema = new Schema ({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	companyName: {type: String, required: true},
	employments: [{type: Schema.Types.ObjectId, ref: 'Employee' }]
});

module.exports = mongoose.model('Employer', EmployerSchema)