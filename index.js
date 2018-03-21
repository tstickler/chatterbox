var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var mime = require("mime");
var wss = require("./websockets-server");

var handleError = function (err, res) {
	res.writeHead(404);

	var filePath = "app/error.html";
	fs.readFile(filePath, function (err, data) {
		res.end(data);
	});
};

var server = http.createServer(function(req, res) {
	console.log("Responding to a request");
	var filePath = extract(req.url);

	fs.readFile(filePath, function(err, data){
		if (err) {
			handleError(err, res);
			return;
		} else {
			var type = mime.getType(filePath);
			res.setHeader("Content-Type", type);
			console.log(type);
			res.end(data);
		}
	});
});

server.listen(3000);
