const router = require('express').Router() 
const userServices = require('./user.service')
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')
// require('../middlewares/auth.middleware')('passport')

router.get('/', userServices.getAllUsers)

router.route('/me')
    .get(passport.authenticate('jwt', {session:false}), userServices.getMyUser)
    .patch(passport.authenticate('jwt', {session: false}),userServices.patchMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.deleteMyUser)
router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), adminValidate, userServices.getUserById)
    .patch(passport.authenticate('jwt', {session: false}), adminValidate, userServices.patchUser)
    .delete(passport.authenticate('jwt', {session: false}), adminValidate, userServices.deleteUser) 

module.exports = router