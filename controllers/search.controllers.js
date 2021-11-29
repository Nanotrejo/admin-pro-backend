const { response } = require("express");
const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const Doctor = require("../models/doctors.model");

const getSearchAll = async (req, res = response) => {
	const search = req.params.search;

	const regex = new RegExp(search, "i");

	const [user, hospital, doctor] = await Promise.all([
		User.find({ name: regex }),
		Hospital.find({ name: regex }),
		Doctor.find({ name: regex }),
	]);

	res.json(200, {
		ok: true,
		user,
		hospital,
		doctor,
	});
};

const getDocCollection = async (req, res = response) => {
	const table = req.params.table;
	const search = req.params.search;

	const regex = new RegExp(search, "i");

	let data = [];

	switch (table) {
		case "doctor":
			data = await Doctor.find({ name: regex }).populate("user", "name img").populate("hospital", "name img");

			break;
		case "hospital":
			data = await Hospital.find({ name: regex }).populate("user", "name img");
			break;
		case "user":
			data = await User.find({ name: regex });

			break;

		default:
			return res.status(400).json({
				ok: false,
				msg: "La tabla tiene que ser usuarios-medicos-hospitales",
			});
	}

	res.json({ ok: true, data });
};

module.exports = {
	getSearchAll,
	getDocCollection,
};
