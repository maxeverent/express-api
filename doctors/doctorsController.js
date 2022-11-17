const connect = require('../knex')

class doctorsController {
    async get(req, res) {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const doctors = await connect.select("*").from("doctor")
            return res.status(200).json(doctors)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }

    async create(req, res) {
        try {
            const {fname, sname, patronymic, speciality, cabinet_id} = req.body
            const doctor = {fname, sname, patronymic, speciality, cabinet_id}
            await connect("doctor").insert(doctor)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(doctor)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }

    async put(req, res) {
        try {
            const {fname, sname, patronymic, speciality, cabinet_id} = req.body
            const {id} = req.params
            const doctor = {fname, sname, patronymic, speciality, cabinet_id}
            await connect("doctor").where("id", id).update(doctor)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(doctor)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json({message: "Error"})
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const doctor = await connect("doctor").where("id", id)
            if (doctor.length == 0) {
                return res.status(400).json("Такой записи нет")
            }
            await connect("doctor").where("id", id).del()
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(doctor)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }
}

module.exports = new doctorsController()