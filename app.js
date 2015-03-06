var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/donkey', function(req, res, next) {
	fs.readdir('./public/videos', function(err, files) {
		if (err) return next(err);
		files = files.filter(function(file) { return ~file.toLowerCase().indexOf('mov'); });
		console.log(files);
		res.render('donkey', {
			title : 'Donkey',
			videos : files
		});
	});
});

app.get('*', function(req, res) {
	res.end('hi');
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.end('doens\'t work try again later');
});

app.listen(3000);
