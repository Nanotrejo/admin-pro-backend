/*
    PATH: /api/all/:search
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getSearchAll, getDocCollection } = require("../controllers/search.controllers");
const { validationFields } = require("../middlewares/validation fields");

const { validationJWT } = require("../middlewares/validation-jwt");
const router = Router();

router.get("/:search", validationJWT, getSearchAll);
router.get("/collection/:table/:search", validationJWT, getDocCollection);

module.exports = router;
