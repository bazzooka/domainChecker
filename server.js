var dns = require('dns'),
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
			dns.resolve4(name + extension, function(err, address){
				if(err){
					resultats.push(extension);	
				}
				callback(null, true);	
			});
		}
		
	}, function(err){
		if(err){
			console.log(err);
			return true;
		}
		if(resultats.length === 0){
			generalCallback(false);
			console.log("Not Available");
		} else {
			generalCallback(true);
			console.log("Available");
		}

	});
}

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

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



