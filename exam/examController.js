const connect = require('../knex')

class doctorsController {
    async get(req, res) {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const exams = await connect.select("*").from("exam")
            return res.status(200).json(exams)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }

    async create(req, res) {
        try {
            const {speciality, date, auth_token} = req.body
            const exam = {speciality, date, auth_token}
            await connect("exam").insert(exam)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(exam)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }
}

module.exports = new doctorsController()