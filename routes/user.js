const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
const postsController = require('../controllers/post_controller');

module.exports = router;

router.get('/',(req,res) => {
    res.end('<h1>This is user controller</h1>');
});
router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/post',postsController.post);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create-user',userController.createUser);
router.get('/sign-out',userController.terminateSession);

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'sign-in'}
),userController.createSession);