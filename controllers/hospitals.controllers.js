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
		const hospitalExists = await Hospital.findOne({ name: hospital.name });
		if (hospitalExists) {
			return res.status(400).json({ ok: false, msg: "The name hospitals already exists." });
		}

		const hospitalDB = await hospital.save();

		res.json({ ok: true, hospital: hospitalDB });
	} catch (e) {
		res.status(500).json({ ok: false, msg: "Error interno!" });
	}
};

const updateHospital = async (req, res = response) => {
	const id = req.params.id;
	const uid = req.uid;

	try {
		const hospital = await Hospital.findById(id);

		if (!hospital) {
			res.status(404).json({ ok: false, msg: "No se encuentra el hospital" });
		}

		const changeHospital = { ...req.body, user: uid };

		const updateHosp = await Hospital.findByIdAndUpdate(id, changeHospital, { new: true });
		res.json({
			ok: true,
			updateHosp,
		});
	} catch (error) {
		res.status(500).json({ ok: false, msg: "Error interno" });
	}
};
const deleteHospital = async (req, res = response) => {
	const id = req.params.id;

	try {
		const hospital = await Hospital.findById(id);

		if (!hospital) {
			res.status(404).json({ ok: false, msg: "No se encuentra el hospital" });
		}

		await Hospital.findByIdAndDelete(id);

		res.json({
			ok: true,
			msg: "Hospital eliminado",
		});
	} catch (error) {
		res.status(500).json({ ok: false, msg: "Error interno" });
	}
};

module.exports = {
	getHospitals,
	createHospital,
	updateHospital,
	deleteHospital,
};
