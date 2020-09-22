const express = require("express");
const router = express.Router();

const postApi = require("../../../controllers/api/v1/post_api");
const { post } = require("../../user");

router.get("/", postApi.index);

module.exports = router;
