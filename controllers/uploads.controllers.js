const { response } = require("express");
const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/updateImage");
const Doctor = require("../models/doctors.model");

const fileUpload = async (req, res = response) => {
	const type = req.params.type;
	const id = req.params.id;

	const typeValidate = ["hospitals", "users", "doctors"];
	if (!typeValidate.includes(type)) {
		return res.status(404).json({ ok: false, msg: "El tipo no existe." });
	}

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({ ok: false, msg: "No hay ningún archivo." });
	}

	const file = req.files.image;

	const nameReduce = file.name.split(".");
	const extensionFile = nameReduce[nameReduce.length - 1];

	const extensionValidate = ["png", "jpg", "jpeg", "gif"];

	if (!extensionValidate.includes(extensionFile.toLowerCase())) {
		return res.status(400).json({ ok: false, msg: "No es una extensión válida." });
	}

	const nameFile = `${uuidv4()}.${extensionFile}`;

	const path = `./uploads/${type}/${nameFile}`;

	try {
		updateImage(type, id, nameFile);

		file.mv(path, (err) => {
			if (err) {
				return res.status(400).json({ ok: false, msg: "Error al mover la imagen." });
			}

			return res.json({ ok: true, name: nameFile });
		});
	} catch (e) {
		res.status(400).json({ ok: false, msg: "El ID no es correcto." });
	}
};

const getPhoto = (req, res = response) => {
	const type = req.params.type;
	const photo = req.params.photo;

	const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

	if (fs.existsSync(pathImg)) {
		res.sendFile(pathImg);
	} else {
		const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
		res.sendFile(pathImg);
	}
};

module.exports = {
	fileUpload,
	getPhoto,
};
