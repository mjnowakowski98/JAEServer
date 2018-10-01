const env = process.env.NODE_ENV || "dev";

const globalConfig = {
	app: {
		mode: "http",
		port: parseInt(process.env.JAE_PORT) || 54198
	}
};

const dev = {};
const test = {};

const config = {
	dev,
	test
};

module.exports = {
	settings: globalConfig,
	env: config[env]
};