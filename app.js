var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/veato');
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
})

app.listen(8080);
console.log("App is listening on port 8080");

var Game = mongoose.model('Game', {
	name 		: String,
	updated	: { type: Date, default: Date.now }
	owner 	: String,
	email		: String,
	curr 		: String,
	currBy 	: String,
	prev		: Schema.Types.Mixed,
	gameId	: String
});

app.get('/api/games', function(req, res) {
	Game.find(function(err, games) {
		if (err) 
			res.send(err);

		res.json(games);	
	});
});

app.post('/api/games', function(req, res) {
	Game.create({
		name : req.body.text,
		
	});
})
