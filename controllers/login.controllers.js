const { response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const userDB = await User.findOne({ email: email });

		if (!userDB) {
			return res.status(404).json({
				ok: false,
				msg: "Email o contraseña no son correctas.",
			});
		}

		const validatorPassword = bcrypt.compareSync(password, userDB.password);

		if (!validatorPassword) {
			return res.status(400).json({ ok: false, msg: "Email o contraseña no son correctas." });
		}

		const token = await generateJWT(userDB.id, userDB.name);

		res.json({ ok: true, token });
	} catch (e) {
		res.status(500).json({ ok: false, msg: "Internal Error" });
	}
};

module.exports = { login };
