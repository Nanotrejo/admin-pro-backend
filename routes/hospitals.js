/*
    PATH: /api/hospitals
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validationFields } = require("../middlewares/validation fields");

const { validationJWT } = require("../middlewares/validation-jwt");
const router = Router();

const {
	getHospitals,
	createHospital,
	updateHospital,
	deleteHospital,
} = require("../controllers/hospitals.controllers");

router.get("/", [validationJWT], getHospitals);

router.post(
	"/",
	[validationJWT, check("name", "El nombre del hospital es necesario.").not().isEmpty(), validationFields],
	createHospital
);

router.put("/:id", [], updateHospital);

router.delete("/:id", deleteHospital);

module.exports = router;
