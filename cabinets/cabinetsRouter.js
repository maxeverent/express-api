const Router = require('express')
const controller = require('./cabinetsController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const rolesMiddleware = require('../middleware/rolesMiddleware')

const router = new Router 

router.get('/get', controller.get)
router.post('/create', controller.create)
router.post('/update/:id', controller.put)
router.post('/delete/:id', controller.delete)

module.exports = router