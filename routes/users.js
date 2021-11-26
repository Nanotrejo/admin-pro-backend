/*
    PATH: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validationFields } = require("../middlewares/validation fields");

const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users.controllers");
const { validationJWT } = require("../middlewares/validation-jwt");
const router = Router();

router.get("/", validationJWT, getUsers);

router.post(
	"/",
	[
		validationJWT,
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("password", "La contraseña  es obligatorio").not().isEmpty(),
		check("email", "El email  es obligatorio").not().isEmpty().isEmail(),
		validationFields,
	],
	createUser
);

router.put(
	"/:id",
	[
		validationJWT,
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("role", "El rol  es obligatorio").not().isEmpty(),
		check("email", "El email  es obligatorio").not().isEmpty().isEmail(),
		validationFields,
	],
	updateUser
);

router.delete("/:id", validationJWT, deleteUser);

module.exports = router;
