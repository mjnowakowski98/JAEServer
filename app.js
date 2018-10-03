/*
TODO:
	Clean up/split this file
	Create UML Diagrams
	Create structure for engine wrapper
*/


const { settings, env } = require("./config.js");
const http = require("http");
const Util = require("./lib/util.js");

console.log(Util.randomBetween(0,1));

function genSessionId(length) {
	let range = [
		[[48, 57]],
		[[97, 122]]
	]

	let codeGen = new Array();
	for(let i = 0; i < length; i++) {
		let tmpRange = Util.randomBetween(0, settings.math.charRanges.length - 1);
		Util.randomBetween(range[tmpRange][0], range[tmpRange][1]);
	}

	let tmpString = "";
	for(let i = 0; i < length; i++) {
		let char = String.fromCharCode(codeGen[i]);
		tmpString += char;
	}

	return tmpString;
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
			response.end(genSessionId());
			return;
		} else {
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(403);
			response.end("Control requests should be sent through POST");
		}
	});
}).listen(settings.app.port);