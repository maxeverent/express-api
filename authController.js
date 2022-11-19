const connect = require('./knex')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')

const genereteAccessToken = (id, username, roles) => {
    const payload = {
        id,
        roles,
        username,
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!(errors.isEmpty())) {
                return res.status(400).json({message: "Err", errors})
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
            const {username, password} = req.body
            const candidate = await connect.select("*").from("user").where("username", "=", username)
            if (candidate.length == 0) {
                return res.status(400).json({message: 'Такого не существует'})
            }
            console.log(candidate)
            const validPassword = bcrypt.compareSync(password, candidate[0].password)
            if (!validPassword) {
                return res.status(400).json({message: 'Не верный пароль'})
            }
            const token = genereteAccessToken(candidate[0].id, candidate[0].username, candidate[0].roles)
            return res.json({token})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await connect.select("*").from("user")
            return res.status(200).json(users)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new authController()