const env = process.env.NODE_ENV || "dev";

const settings = {
	app: {
		mode: "http",
		port: parseInt(process.env.JAE_PORT) || 54198
	},
	session: {
		idLength: parseInt(process.env.JAE_SESSION_IDLENGTH) || 25,
		cookieName: process.env.JAE_SESSION_COOKIENAME || "sessionId"
	},
	math: {
		charRanges: [
			[48, 57],
			[97, 122]
		]
	}
};

const dev = {};
const test = {};

const config = {
	dev,
	test
};

module.exports = {
	settings,
	env: config[env]
};