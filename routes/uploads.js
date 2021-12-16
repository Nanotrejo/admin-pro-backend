/*
    PATH: /api/uploads/ 
*/

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");

const { check } = require("express-validator");
const { fileUpload, getPhoto } = require("../controllers/uploads.controllers");
const { validationFields } = require("../middlewares/validation fields");

const { validationJWT } = require("../middlewares/validation-jwt");
const router = Router();

router.use(expressFileUpload());

router.put("/:type/:id", validationJWT, fileUpload);

router.get("/:type/:photo", getPhoto);

module.exports = router;
