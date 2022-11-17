const connect = require('../knex')

class cabinetsController {
    async get(req, res) {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const cabinets = await connect.select("*").from("cabinet")
            return res.status(200).json(cabinets)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }

    async create(req, res) {
        try {
            const {number, name, date_working} = req.body
            const cabinetStatus = await connect("cabinet").where("number", number)
            if (cabinetStatus.length != 0) {
                return res.status(400).json("Такой номер существует")
            }
            const cabinet = {number, name, date_working}
            await connect("cabinet").insert(cabinet)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(cabinet)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }

    async put(req, res) {
        try {
            const {number, name, date_working} = req.body
            const {id} = req.params
            const cabinetStatus = await connect("cabinet").where("number", number)
            if (cabinetStatus.length != 0) {
                if (cabinetStatus[0].number != number) {
                    return res.status(400).json("Такой номер существует")
                }
            }
            const cabinet = {number, name, date_working}
            await connect("cabinet").where("id", id).update(cabinet)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(cabinet)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json({message: "Error"})
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const cabinet = await connect("cabinet").where("id", id)
            if (cabinet.length == 0) {
                return res.status(400).json("Такого кабинета нет")
            }
            await connect("cabinet").where("id", id).del()
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(200).json(cabinet)
        } catch(e) {
            console.log(e)
            res.header("Access-Control-Allow-Origin", "*")
            return res.status(400).json("Error")
        }
    }
}

module.exports = new cabinetsController()