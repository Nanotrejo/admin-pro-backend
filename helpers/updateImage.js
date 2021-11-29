const fs = require("fs");
const User = require("../models/user.model");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospital.model");

const deleteImage = (path) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};
const updateImage = async (type, id, nameFile) => {
	let pathOld = "";
	switch (type) {
		case "doctors":
			const doctor = await Doctor.findById(id);
			if (!doctor) {
				return false;
			}
			pathOld = `./uploads/doctors/${doctor.img}`;
			deleteImage(pathOld);

			doctor.img = nameFile;
			await doctor.save();
			return true;
			break;
		case "hospitals":
			const hospital = await Hospital.findById(id);
			if (!hospital) {
				return false;
			}
			pathOld = `./uploads/hospitals/${hospital.img}`;
			deleteImage(pathOld);

			hospital.img = nameFile;
			await hospital.save();
			return true;
			break;
		case "users":
			const user = await User.findById(id);
			if (!user) {
				return false;
			}
			pathOld = `./uploads/users/${user.img}`;
			deleteImage(pathOld);

			user.img = nameFile;
			await user.save();
			return true;
			break;
	}
};

module.exports = {
	updateImage,
};
