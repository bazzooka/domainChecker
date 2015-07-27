var whois = require('node-whois'),
	async = require('async'),
	express = require('express'),
	app = express(),
	path = require('path');

var extensions = ['.com', '.fr'];

function checkAvailability(name, generalCallback) {
	var resultats = [];
	async.each(extensions, function(extension, callback){
		if(extension){
			console.log("Check ", name + extension);
			whois.lookup(name+extension, function(err, data) {
				if(data && data.indexOf("No entries found") >=0 || data && data.indexOf('No match for domain') >= 0){
					resultats.push(extension);
				}
				callback(null, true);	
			});
		}
		
	}, function(err){
		if(err){
			return true;
		}
		console.log('Length', resultats);
		if(resultats.length !== extensions.length){
			generalCallback(false);
			console.log("Not Available");
		} else {
			generalCallback(true);
			console.log("Available");
		}

	});
	

};

// checkAvailability("omegasolutionss");


app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.get('/', function (req, res) {
  res.sendfile("index.html");
});

app.get('/availability/:domain', function(req, res){
	var domain = req.params.domain;
	checkAvailability(domain, function(resultat){
		res.send(resultat);
	});
});

var server = app.listen(process.argv[2] || 3001, function () {
	
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



