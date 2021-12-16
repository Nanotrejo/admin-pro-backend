/*
    PATH: /api/hospitals
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validationFields } = require("../middlewares/validation fields");

const { validationJWT } = require("../middlewares/validation-jwt");
const router = Router();

const {
	getDoctors,
	createDoctor,
	updateDoctor,
	deleteDoctor,
	getDoctorById,
} = require("../controllers/doctors.controllers");

router.get("/", validationJWT, getDoctors);

router.post(
	"/",
	[
		validationJWT,
		check("name", "El nombre del médico es obligatorio").not().isEmpty(),
		check("hospital", "El hospital ID debe ser válido").isMongoId(),
		validationFields,
	],
	createDoctor
);

router.put(
	"/:id",
	validationJWT,
	[
		check("name", "El nombre del médico es obligatorio").not().isEmpty(),
		check("hospital", "El hospital ID debe ser válido").isMongoId(),
		validationFields,
	],
	updateDoctor
);

router.delete("/:id", [validationJWT], deleteDoctor);

router.get("/:id", [validationJWT], getDoctorById);

module.exports = router;
