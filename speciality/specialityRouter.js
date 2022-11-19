const Router = require('express')
const controller = require('./specialityController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const rolesMiddleware = require('../middleware/rolesMiddleware')

const router = new Router 

router.get('/get', controller.get)


module.exports = router