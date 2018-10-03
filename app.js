const { settings, env } = require("./config.js");

const JAE = require("jae-engine");
const http = require("http");

const server = http.createServer((request, response) => {
	console.log("Request recieved");
	let reqData;

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
		switch(request.headers['content-type']) {
			case "application/json":
				try { reqData = JSON.parse(chunk);
				} catch(err) { reqData = null; }
				console.log(reqData);
				break;
			default:
				break;
		}
		
	}).on('end', () => {
		console.log("Respond");
		if (request.method === 'POST') {
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(200);
			response.end("test");
			return;
		} else {
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(403);
			response.end("Control requests should be sent through POST");
		}
	});
}).listen(settings.app.port);