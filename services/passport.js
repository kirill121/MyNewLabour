const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const secret = require('../config/secret');
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
	User.findOne({ email: email }, function(err, user){
		if(err) {
			return done(err);
		}
		if(!user){
			return done(null, false);
		}

		user.comparePassword(password, function(err, isMatch) {
			if(err){
				return done(err);
			}
			if(!isMatch){
				return done(null, false);
			}
			return done(null, user);
		});
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
	User.findById(payload.sub, (error, user) => {
		if(error){
			return done(error, false)
		}
		if(user){
			done(null, user)
		} else {
			done(null, false)
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);		