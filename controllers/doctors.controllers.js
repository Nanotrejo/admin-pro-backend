const { response } = require("express");
const Doctor = require("../models/doctors.model");

const getDoctors = async (req, res = response) => {
	try {
		const doctors = await Doctor.find().populate("user", "name").populate("hospital", "name");

		res.json({ ok: true, doctor: doctors });
	} catch (err) {
		res.json(500, {
			ok: true,
			msg: "Error interno!",
		});
	}
};

const createDoctor = async (req, res = response) => {
	const uid = req.uid;
	const doctor = new Doctor({
		user: uid,
		...req.body,
	});

	try {
		const doctorDB = await doctor.save();
		res.json({ ok: true, doctor: doctorDB });
	} catch (err) {
		res.status(500).json({
			ok: false,
			msg: "Error interno!",
		});
	}
};

const updateDoctor = (req, res = response) => {
	res.json({
		ok: true,
		msg: "update",
	});
};
const deleteDoctor = (req, res = response) => {
	res.json({
		ok: true,
		msg: "delete",
	});
};

module.exports = {
	getDoctors,
	createDoctor,
	updateDoctor,
	deleteDoctor,
};
