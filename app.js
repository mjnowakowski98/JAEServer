/*
TODO:
	Clean up/split this file
	Create UML Diagrams
	Create structure for engine wrapper
*/

const { settings, env } = require("./config.js");
const http = require("http");
const Util = require("./lib/util.js");
const Cookies = require("cookies");

const Sessions = {
	"default":null
}

function startSession(sessionId = null) {
	if(!sessionId) {
		sessionId = genSessionId();
	}
}

function genSessionId(length = settings.session.idLength) {
	let codeGen = new Array();
	for(let i = 0; i < length; i++) {
		let tmpRange = Util.randomBetween(0, settings.math.charRanges.length - 1);
		codeGen.push(Util.randomBetween(settings.math.charRanges[tmpRange][0], settings.math.charRanges[tmpRange][1]));
	}

	let tmpString = "";
	for(let i = 0; i < length; i++) {
		let char = String.fromCharCode(codeGen[i]);
		tmpString += char;
	}

	console.log(tmpString);
	return tmpString;
}

http.createServer((request, response) => {
	console.log("Request recieved");
	let cookies = new Cookies(request, response);
	let sId = cookies.get("sessionId");
	if(!sId) {
		sId = genSessionId();
		cookies.set(settings.session.cookieName, sId);
	}

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
			response.end(sId);
			return;
		} else {
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(403);
			response.end("Control requests should be sent through POST");
		}
	});
}).listen(settings.app.port);