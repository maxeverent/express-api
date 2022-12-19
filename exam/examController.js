const connect = require('../knex')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

class doctorsController {
    async get(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Не авторизован"})
            }
            const {roles, username} = jwt.verify(token, secret)
            if (roles == 2) {
                const exams = await connect.select("*").from("exam")
                return res.status(200).json(exams)
            }
            if (roles == 1) {
                const exams = await connect.select("*").from("exam").where("username", username)
                return res.status(200).json(exams)
            }
        } catch(e) {
            console.log(e)
            return res.status(400).json("Error")
        }
    }

    async create(req, res) {
        try {
            const {speciality, date} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Не авторизован"})
            }
            const {username} = jwt.verify(token, secret)
            console.log(username) 
            const exams = {speciality, date, username}
            await connect("exam").insert(exams)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(exams)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }
}

module.exports = new doctorsController()