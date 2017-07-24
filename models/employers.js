const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const EmployerSchema = new Schema ({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, unique: true, lowercase: true, required: true},
	password: {type: String, required: true},
	companyName: {type: String, required: true},
	employments: [{type: Schema.Types.Mixed, ref: 'Employee' }]
});

EmployerSchema.pre('save', function(next){
	const employer = this;

	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next(err);
		}

		bcrypt.hash(employer.password, salt, null, function(err, hash){
			if(err){
				return next(err);
			}

			employer.password = hash;
			next();
		});
	});
});

EmployerSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){
			return callback(err);
		}
		callback(null, isMatch);
	});
}

const Employer = mongoose.model('Employer', EmployerSchema);

module.exports = Employer;