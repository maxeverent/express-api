const Router = require('express')
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const rolesMiddleware = require('./middleware/rolesMiddleware')

const router = new Router()

router.post('/reg', [
    check('username', "Не должно быть пустым").notEmpty(),
    check('password', " 4 < букв < 11").isLength({min: 4, max: 10})], 
    controller.registration)
router.post('/login', controller.login)
router.get('/users', rolesMiddleware(2), controller.getUsers)




module.exports = router