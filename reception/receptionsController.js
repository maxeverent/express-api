const connect = require('../knex')

class receptionsController {
    async get(req, res) {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const receptions = await connect.select("*").from("reception")
            return res.status(200).json(receptions)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }

    async create(req, res) {
        try {
            const {fname, sname, patronymic, doctor_id, date} = req.body
            const receptions = {fname, sname, patronymic, doctor_id, date}
            await connect("reception").insert(receptions)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(receptions)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }

    async put(req, res) {
        try {
            const {fname, sname, patronymic, doctor_id, date} = req.body
            const {id} = req.params
            const receptions = {fname, sname, patronymic, doctor_id, date}
            await connect("reception").where("id", id).update(receptions)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(receptions)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json({message: "Error"})
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const receptions = await connect("reception").where("id", id)
            if (receptions.length == 0) {
                return res.status(400).json("Такой записи нет")
            }
            await connect("reception").where("id", id).del()
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(receptions)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }
}

module.exports = new receptionsController()