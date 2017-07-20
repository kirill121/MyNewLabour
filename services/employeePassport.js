const passport = require('passport');
const Employee = require('../models/employees');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const secret = require('../config/secret');
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	Employee.findOne({ email: email }, (err, employee) => {
		if(err){
			return done(err);
		}
		if(!employee) {
			return done(null, false);
		}

		employee.comparePassword(password, function(err, isMatch) {
			if(err){
				return done(err);
			}
			if(!isMatch){
				return done(null, false);
			}
			return done(null, employer);
		});
	});
});

const cookieExtractor = (req) => {
	var token = null;

	if(req && req.cookies){
		token = req.cookies['jwt']		
	}
	return token;
};

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
	secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
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
});

passport.use(jwtLogin);
passport.use(localLogin);