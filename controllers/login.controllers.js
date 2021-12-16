const { response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res) => {
	const googleToken = req.body.token;

	try {
		const { name, email, picture } = await googleVerify(googleToken);

		const userDB = await User.findOne({ email });
		let user;

		if (!userDB) {
			user = new User({
				user: name,
				email,
				password: "",
				img: picture,
				google: true,
			});
		} else {
			user = userDB;
			user.google = true;
			user.password = "";
		}

		await user.save();

		const token = await generateJWT(userDB.id);

		res.json(200, {
			ok: true,
			token,
		});
	} catch (error) {
		res.json(401, {
			ok: false,
			msg: "Token invalid!",
		});
	}
};

const renewToken = async (req, res = response) => {
	const uid = req.uid;

	const token = await generateJWT(uid);
	const user = await User.findById(uid);

	res.json({ ok: true, token, user });
};
module.exports = { login, googleSignIn, renewToken };
