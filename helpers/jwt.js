const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
			name,
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: "12h",
			},
			(err, token) => {
				if (err) {
					console.error(err);
					reject("No se pudo generar el JWT");
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generateJWT,
};
