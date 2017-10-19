const jwt = require('jwt-simple');
const user = require('../models/users');
const keys = require('../config/keys');

function tokenForUse(user){
	const timestamp = new Date().getTime();

	return jwt.encode({uid: user.id, iat: timestamp}, keys.secret);
}

exports.signup = (req, res, next) => {
	const { email, password, firstName, lastName, username, color } = req.body;

	if(!email || !password || !firstName || !lastName || !username || !color){
		const output = {
			errors: [],
			suggestions: ''
		}
		if(!email){
			output.errors.push('No Email Detected');
			res.send(output);
		}
		if(!password){
			output.errors.push('No Password Found');
		}
		if(!firstName){
			output.errors.push('No First Name Found');
		}
		if(!lastName){
			output.errors.push('No Last Name Found');
		}
		if(!username){
			output.errors.push('No Username Found');
			output.suggestions.username = firstName && lastName ? firstName + ' ' + lastName : 'Lil Bitch';
		}
		if(!color){
			output.errors.push('No Color Found');
			output.suggestions.color = '#00ff00'
		}

		return res.status(422).send(output);
	}
	User.findOne({email}, (err, existingUser) => {
		if(err) return next(err);
		if(existingUser){
			return res.status(422).send({
				errors: ['Email Already In Use']
			})
		}

		const newUser = new User({
			email, password, firstName, lastName, username, color
		});

		newUser.save(err => {
			if(err) return next(err);

			rep.json({ token : tokenForUser(newUser) });
		})
	});
}
exports.signin = (req, res, next) => {
	res.send({token: tokenForUser(req.user)});
}