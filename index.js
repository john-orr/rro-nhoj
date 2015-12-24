var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connect("mongodb://webapp:password@ds053080.mongolab.com:53080/rro-nhoj");

var app = express();
var port = process.env.PORT || 7001;

db.connection.on('connected', function () {
	app.use(bodyParser.json());
	app.use(express.static(`${__dirname}/web`));
	
	var schema = mongoose.Schema({
		key: String,
		value: JSON
	});
	var Record = mongoose.model('Record', schema);

	app.post('/postData', function (req, res) {
		console.log(JSON.stringify(req.body));
		if (req.body.key && req.body.value) {
			var data = new Record();
			data.key = req.body.key;
			data.value = req.body.value;
			data.save(function (err, record) {
				if (err) {
					console.log(`Failed to save.`);
					res.send(`Failed to save.`);
				} else {
					console.log(`Saved successfully`);
					res.send(`Saved successfully`);
				}
			});
		} else {
			console.log(`Invalid data.`);
			res.send(`Invalid data.`);
		}
	});
	
	app.get('/records', function (req, res) {
		Record.find({}, function (err, records) {
			res.json(records);
		})
	});

	app.listen(port);
	console.log(`Listening on port: ${port}`);
})