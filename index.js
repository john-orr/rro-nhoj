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

	app.post('/submit', function (req, res) {
		console.log(JSON.stringify(req.body));
		if (req.body.key && req.body.value) {
			var data = new Record();
			data.key = req.body.key;
			data.value = req.body.value;
			data.save(function (err, response) {
				if (err) {
					console.log(`Error while saving:${err}`);
					res.send({code:0,msg:`Error while saving:${err}`});
				} else {
					console.log(`Saved. Response:${response}`);
					res.send({code:1,msg:`Save successful:${response}`});
				}
			});
		} else {
			console.log(`Invalid data.`);
			res.send({code:0,msg:`Invalid data:${req.body}`});
		}
	});
	
	app.get('/records', function (req, res) {
		Record.find({}, function (err, records) {
			res.json(records);
		})
	});
	
	app.post('/delete', function (req, res) {
		console.log(`Deleting:${JSON.stringify(req.body)}`);
		Record.find({"_id":req.body.id}).remove(function (err, response) {
			if (err) {
				console.log(`Error while removing:${err}`);
				res.send({code:0,msg:`Error while deleting:${err}`});
			} else {
				console.log(`Deleted. Response:${response}`);
				res.send({code:1,msg:`Delete successful:${response}`});
			}
		});
	});
	
	app.post('/update', function (req, res) {
		console.log(`Updating:${JSON.stringify(req.body)}`);
		Record.find({"_id":req.body.id}).update({key:req.body.key,value:req.body.value}, function (err, response) {
			if (err) {
				console.log(`Error whie updating:${err}`);
				res.send({code:0,msg:`Error while updating:${err}`});
			} else {
				console.log(`Updated. Response:${JSON.stringify(response)}`);
				res.send({code:1,msg:`Updated successful:${JSON.stringify(response)}`});
			}
		});
	});

	app.listen(port);
	console.log(`Listening on port: ${port}`);
})