const { settings, env } = require("./config.js");

const JAE = require("jae-engine");
console.log(JAE);
const http = require("http");

let sessions = new Array();

function clientCommand(command, data = null) {
	switch(command) {
		case "startSession":
			
			break;
	}
}

http.createServer((request, response) => {
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
		switch(request.headers['content-type']) {
			case "application/json":
				let reqData;
				try { reqData = JSON.parse(chunk);
				} catch(err) { reqData = null; }
				break;
			case "text/plain":
				
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