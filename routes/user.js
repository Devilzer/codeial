const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');
const postsController = require('../controllers/post_controller');

module.exports = router;

router.get('/',(req,res) => {
    res.end('<h1>This is user controller</h1>');
});
router.get('/profile',userController.profile);
router.get('/post',postsController.post);