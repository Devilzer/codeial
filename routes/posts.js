const express = require('express');
const router = express.Router();
const passpost = require('passport');

const postsController = require('../controllers/post_controller');
const { Router } = require('express');

router.post('/create',passpost.checkAuthentication,postsController.create);
router.get('/destroy/:id',passpost.checkAuthentication,postsController.destroy);

module.exports = router;
