var _ = require('underscore');
var User = require('../models').User;
exports.login = function(req, res){
	var logindata = _.pick(req.body, 'phone','email', 'password');
	User.find({
		phone:logindata.phone,
		email:logindata.email,
		password:logindata.password
	}).exec(function(err, data){
		if(err) return res.json({success:false});
		else if(data){
			
			req.session.user={
				isLogin: true,
				email: data.email,
				phone: data.phone
			}

			res.json({success:true});

		}
			
		
	})
}

exports.logout = function(req, res){
	
}