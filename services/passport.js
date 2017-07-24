const passport = require('passport');
const Employer = require('../models/employers');
const Employee = require('../models/employees');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const secret = require('../config/secret');
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	Employer.findOne({ email: email }, function(err, employer){
		if(err) {
			return done(err);
		}
		if(!employer){
				Employee.findOne({ email: email }, (err, employee) => {
					if(err){
						return done(err);
					}
					employee.comparePassword(password, function(err, isMatch) {
						if(err){
							return done(err);
						}
						if(!isMatch){
							return done(null, false);
						}
						return done(null, employee);
					});
				});
		} else {
			employer.comparePassword(password, function(err, isMatch) {
				if(err){
					return done(err);
				}
				if(!isMatch){
					return done(null, false);
				}
				return done(null, employer);
			});
		}
	});
});

const cookieExtractor = (req) => {
	var token = null;

	if(req && req.cookies){
		token = req.cookies['jwt']
	}
	console.log(token);
	return token;
};

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
	secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	Employer.findById(payload.sub, (error, employer) => {
		if(error){
			return done(error, false)
		}
		if(employer){
			done(null, employer)
		} else {
			Employee.findById(payload.sub, (error, employee) => {
				if(error){
					return done(error, false)
				}
				if(employee){
					done(null, employee)
				} else {
					done(null, false)
				}
			});
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);		