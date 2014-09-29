var Pwd = require("../models").Pwd;
var _ = require('underscore');

exports.create = function(req ,res){
	var newpwd = new Pwd({
		title: req.body.title,
		pwd: req.body.pwd
	});
}

exports.show = function(req, res){
	Pwd.find().exec(function(err, data){
		if(err) return res.json({success: false, data: err});
		res.json({success: true, data: data});
	})
} 

exports.update = function(req, res){
	var pwdid = req.params.id;
	var query = _.pick(req.body, "title", "pwd");
	Pwd.update({id: pwdid}, {$set: query}, function(err, result){
		if(err) return res.json({success:false, data: err})
		res.json({success:true, data: result});
	})
}

exports.destroy = function(req, res){
	User.remove({
        id: req.params.id
    }, function(err) {
        if (err) return res.json({success:false, data:err}});
        res.json({success:true})
    });
}