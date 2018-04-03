const Employees = require('../models/employees');
var middlewareObj = {};

middlewareObj.rating = function(req, res, next){
	var employeeId = req.params.id
	var val;
	if(req.body.one == 1){
		val = 1;
	} else if (req.body.two == 2){
		val = 2;
	} else if (req.body.three == 3){
		val = 3;
	} else if (req.body.four == 4){
		val = 4;
	} else if (req.body.five == 5){
		val = 5;
	}
	Employees.findByIdAndUpdate(employeeId, {$push: {ratings: val}}, {new: true}, (err, update) => {
			if(err){
				console.log(err)
			}
			else {
				var counter = 0;
				var rater = update.ratings
				var sumOfArray = rater.reduce(function(accu, val){
					if(val > 0){
						counter++
					}
					return accu + val
				}, 0)
				var finalNum = sumOfArray / counter
				var rounded = Math.round( finalNum * 10 ) / 10;
				Employees.findByIdAndUpdate(employeeId, {$push: {rating: rounded}}, {new: true}, (err, update) => {
					if(err){
						console.log(err)
					} else {
						var newArr = update.rating.slice(-1)
						update.rating = newArr
						console.log(update)
						res.redirect('/employers/view/' + req.user.id)
					}
				})
			}
	})
}	

module.exports = middlewareObj;

