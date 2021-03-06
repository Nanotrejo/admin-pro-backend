/*
    PATH: /api/auth
*/

const { login, googleSignIn, renewToken } = require("../controllers/login.controllers");

const { Router } = require("express");
const { check } = require("express-validator");
const { validationFields } = require("../middlewares/validation fields");
const { validationJWT } = require("../middlewares/validation-jwt");

const router = Router();

router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "La password es obligatorio").not().isEmpty(),
		validationFields,
	],
	login
);
router.post(
	"/google",
	[check("token", "El token de Google es obligatorio").not().isEmpty(), validationFields],
	googleSignIn
);

router.get("/renew", validationJWT, renewToken);

module.exports = router;
