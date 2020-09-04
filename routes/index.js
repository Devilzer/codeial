const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log("router loaded");

module.exports= router;

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/posts',require('./posts'));