var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/pwdpocket");
autoIncrement.initialize(connection);

var userSchema = new Schema({
	email: String,
	phone: String, 
	password: String
})

var pwdSchema = new Schema({
	id: String,
	title: String,
	pwd: String,
	createdAt: {type: Date, default: Date.now}
});


pwdSchema.plugin(autoIncrement.plugin, {model: "Pwd", field: "id"});


exports.Pwd = connection.model('Pwd', pwdSchema);
exports.User = connection.model('User', userSchema);