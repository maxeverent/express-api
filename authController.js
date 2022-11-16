const connect = require('./knex')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!(errors.isEmpty())) {
                return res.status(400).json({message: "ты еблан", errors})
            }
            const {username, password} = req.body
            const candidate = await connect.select("*").from("user").where("username", "=", username)
            if (candidate.length > 0) {
                console.log(candidate)
                return res.status(400).json({message: 'Такой есть уже'})
            }
            const hashPassword = bcrypt.hashSync(password, 4)
            const user = {username, password: hashPassword, roles: 1}
            await connect("user").insert(user)
            return res.status(200).json(user)
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Reg error'})
        }
    }

    async login(req, res) {
        try {

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new authController()