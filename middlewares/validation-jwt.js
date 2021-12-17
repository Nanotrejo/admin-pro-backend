const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

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

const validationAdminRol = async (req, res, next) => {
	const uid = req.uid;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			return res.status(404).json({ ok: false, msg: "User no exist!" });
		}

		if (userDB.role !== "ADMIN_ROLE") {
			return res.status(403).json({ ok: false, msg: "YOU HAVEN`T PRIVILEGE!" });
		}

		next();
	} catch (e) {
		return res.json(401, { ok: false, msg: "No ADMIN ROLE!" });
	}
};

const validationUser = async (req, res, next) => {
	const uid = req.uid;
	const id = req.params.id;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			return res.status(404).json({ ok: false, msg: "User no exist!" });
		}

		if (userDB.role !== "ADMIN_ROLE" && uid !== id) {
			return res.status(403).json({ ok: false, msg: "YOU HAVEN`T PRIVILEGE!" });
		}

		next();
	} catch (e) {
		return res.json(401, { ok: false, msg: "No ADMIN ROLE!" });
	}
};

module.exports = { validationJWT, validationAdminRol, validationUser };
