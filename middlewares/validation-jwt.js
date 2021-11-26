const jwt = require("jsonwebtoken");

const validationJWT = (req, res, next) => {
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({ ok: false, msg: "No hay token en la petición!" });
	}

	try {
		const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.uid = uid;
	} catch (e) {
		return res.json(401, { ok: false, msg: "Token no valido!" });
	}

	next();
};

module.exports = { validationJWT };
