const { response } = require("express");
const Doctor = require("../models/doctors.model");

const getDoctors = async (req, res = response) => {
	try {
		const doctors = await Doctor.find().populate("user", "name").populate("hospital", "name");

		res.json(200, { ok: true, doctor: doctors });
	} catch (err) {
		res.status(500).json({
			ok: false,
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

const updateDoctor = async (req, res = response) => {
	const id = req.params.id;
	const uid = req.uid;

	try {
		const doctor = await Doctor.findById(id);

		if (!doctor) {
			res.status(404).json({ ok: false, msg: "No se encuentra el doctor" });
		}

		const changedoctor = { ...req.body, user: uid };

		const updateDoct = await Doctor.findByIdAndUpdate(id, changedoctor, { new: true });
		res.json({
			ok: true,
			updateDoct,
		});
	} catch (error) {
		res.status(500).json({ ok: false, msg: "Error interno" });
	}
};
const deleteDoctor = async (req, res = response) => {
	const id = req.params.id;

	try {
		const doctor = await Doctor.findById(id);

		if (!doctor) {
			res.status(404).json({ ok: false, msg: "No se encuentra el doctor" });
		}

		await Doctor.findByIdAndDelete(id);

		res.json({
			ok: true,
			msg: "Doctor eliminado",
		});
	} catch (error) {
		res.status(500).json({ ok: false, msg: "Error interno" });
	}
};

const getDoctorById = async (req, res = response) => {
	const id = req.params.id;

	try {
		const doctors = await Doctor.findById(id).populate("user", "name").populate("hospital", "name");

		res.json(200, { ok: true, doctor: doctors });
	} catch (err) {
		res.status(500).json({
			ok: false,
			msg: "Error interno!",
		});
	}
};

module.exports = {
	getDoctors,
	createDoctor,
	updateDoctor,
	deleteDoctor,
	getDoctorById,
};
