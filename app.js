const { settings, env } = require("./config.js");

const jae = require("jae-engine");
const http = require("http");

const server = http.createServer((request, response) => {
	response.on('error', (err) => {
		console.error(err);
	});

	response.setHeader('Access-Control-Allow-Origin', '*');
	if(request.method === 'OPTIONS') {
		response.setHeader('Access-Control-Allow-Methods', 'POST');
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		response.writeHead(200);
		response.end();
	} else if (request.method === 'POST') {
		response.setHeader('Content-Type', request.headers["content-type"]);
		response.writeHead(200);
		request.pipe(response);
	} else {
		response.setHeader("Content-Type", "text/plain");
		response.writeHead(403);
		response.end("Please request using POST");
	}
}).listen(settings.app.port);