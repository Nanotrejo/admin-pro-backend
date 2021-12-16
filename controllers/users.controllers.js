const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
	const from = Number(req.query.from) || 0;

	const [users, total] = await Promise.all([
		User.find({}, "name email role gmail img google").skip(from).limit(5),
		User.count(),
	]);

	res.json(200, {
		ok: true,
		users: users,
		total,
	});
};

const createUser = async (req, res) => {
	const { name, password, email } = req.body;

	try {
		const emailExists = await User.findOne({ email: email });

		if (emailExists) {
			return res.status(400).json({ ok: false, msg: "The email already exists." });
		}
		const user = new User(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		const token = await generateJWT(user.id);

		res.json(200, {
			ok: true,
			user,
			token,
		});
	} catch (e) {
		res.status(500).json({ ok: false, msg: "Error interno" });
	}
};

const updateUser = async (req, res = response) => {
	const uid = req.params.id;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			return res.status(404).json({ ok: false, msg: "El usuario no existe" });
		}

		const { password, google, email, ...fields } = req.body;

		if (userDB.email !== email) {
			const emailExists = await User.findOne({ email });
			if (emailExists) {
				return res.status(400).json({ ok: false, msg: "Ya existe un usuario con ese email" });
			}
		}

		// if (!userDB.google) {
		// 	fields.email = email;
		// } else if (userDB.google.email !== email) {
		// 	return res.status(400).json({ ok: false, msg: "Usuarios de Google no pueden cambiar su correo." });
		// }

		const updateData = await User.findByIdAndUpdate(uid, fields);

		res.json({ ok: true, fields });
	} catch (e) {
		res.status(500).json({ ok: false, msg: "Error interno" });
	}
};

const deleteUser = async (req, res) => {
	const uid = req.params.id;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			return res.status(404).json({ ok: false, msg: "El usuario no existe" });
		}
		await User.findByIdAndDelete(uid);

		res.json({ ok: true });
	} catch (e) {
		res.status(500).json({ ok: false, msg: "Error interno" });
	}
};

module.exports = {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
};
