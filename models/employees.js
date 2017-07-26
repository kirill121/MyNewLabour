const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const EmployeeSchema = new Schema ({
	labourType: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	telephoneNo: {type: Number, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	day: {type: Number, required: true},
	month: {type: String, required: true},
	year: {type: Number, required: true},
	employer: [{type: Schema.Types.ObjectId, ref: 'Employer'}]
});

EmployeeSchema.pre('save', function(next){
	const employee = this;

	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next(err);
		}

		bcrypt.hash(employee.password, salt, null, function(err, hash){
			if(err){
				return next(err);
			}

			employee.password = hash;
			next();
		});
	});
});

EmployeeSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){
			return callback(err);
		}
		callback(null, isMatch);
	});
}

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;