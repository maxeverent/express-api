const Router = require('express')
const controller = require('./examController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const rolesMiddleware = require('../middleware/rolesMiddleware')

const router = new Router 

router.get('/get', controller.get)
router.post('/create', controller.create)


module.exports = router