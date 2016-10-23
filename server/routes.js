var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');

var weeks = require('./../public/models/weeks');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		weeks: weeks.getList()
	});
});

router.get('/sw.js', function(req, res, next) {
	//var serviceWorker = require('./service-worker.js')
	//console.log('serviceWorker', serviceWorker)
	var fileContents = fs.readFileSync(path.join(__dirname, 'service-worker.js'), 'utf-8')

	console.log('typeof fileContents', fileContents)
	const stylePath = '/style.css'
	const jsPath = '/main-compiled.js'
	fileContents = fileContents.replace(stylePath, req.app.locals.getVersionedPath(stylePath))
	fileContents = fileContents.replace(jsPath, req.app.locals.getVersionedPath(jsPath))

	res.set('Content-Type', 'application/javascript');
	res.send(fileContents);
});

module.exports = router;
