const config = {
	jwt: {
		secret: process.env.JWT_SECRET || "findjob-secret-key",
	},
};

module.exports = config;
