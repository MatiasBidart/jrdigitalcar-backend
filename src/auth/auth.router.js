const router = require('express').Router();
////const {application} =require('express')////
const authServices = require('./auth.service');
const {registerUser} = require('../users/user.service');

router.post('/register', registerUser);
router.post('/login', authServices.login);

module. exports = router