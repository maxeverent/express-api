const Router = require('express')
const controller = require('./authController')
const {check} = require('express-validator')

const router = new Router()

router.post('/reg', [
    check('username', "Низя пустым").notEmpty(),
    check('password', "> 4 < 10 букав").isLength({min: 4, max: 10})], 
    controller.registration)
router.post('/login')

module.exports = router