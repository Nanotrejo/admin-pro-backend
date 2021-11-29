const { response } = require("express");

const Hospital = require("../models/hospital.model");

const getHospitals = async (req, res = response) => {
	try {
		const hospitals = await Hospital.find().populate("user", "name img");

		res.json({ ok: true, hospitals: hospitals });
	} catch (err) {
		res.json(500, {
			ok: true,
			msg: "Error interno!",
		});
	}
};

const createHospital = async (req, res = response) => {
	const uid = req.uid;
	const hospital = new Hospital({
		user: uid,
		...req.body,
	});

	try {
		const hospitalExists = await Hospital.findOne({ name: name });

		if (hospitalExists) {
			return res.status(400).json({ ok: false, msg: "The name hospitals already exists." });
		}

		const hospitalDB = await hospital.save();

		res.json({ ok: true, hospital: hospitalDB });
	} catch (e) {
		res.status(500).json({ ok: false, msg: "Error interno!" });
	}
};

const updateHospital = (req, res = response) => {
	res.json({
		ok: true,
		msg: "update",
	});
};
const deleteHospital = (req, res = response) => {
	res.json({
		ok: true,
		msg: "delete",
	});
};

module.exports = {
	getHospitals,
	createHospital,
	updateHospital,
	deleteHospital,
};
