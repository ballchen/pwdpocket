var User = require("../models").User;

exports.getuser = function(req ,res){
	User.find().exec(function(err, data){
		if(err) return res.json({success:false, data: err});
		res.json({success:true, data: data});
	})
}
