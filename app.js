const { settings, env } = require("./config.js");

const jae = require("jae-engine");
const http = require("http");

const server = http.createServer((request, response) => {
	console.log("Request recieved");

	response.setHeader('Access-Control-Allow-Origin', '*');
	if(request.method === 'OPTIONS') {
		console.log("Pre-flight");
		response.setHeader('Access-Control-Allow-Methods', 'POST');
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		response.writeHead(200);
		response.end();
		return;
	}

	response.on('error', (err) => {
		console.error(err);
	});

	request.on('data', (chunk) => {
		console.log("Data read: " + chunk);
	}).on('end', () => {
		console.log("Respond");
		if (request.method === 'POST') {
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(200);
			response.end("test");
		} else {
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(403);
			response.end("Control requests should be sent through POST");
		}
	});
}).listen(settings.app.port);