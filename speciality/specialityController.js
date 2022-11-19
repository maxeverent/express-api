const connect = require('../knex')

class receptionsController {
    async get(req, res) {
        try {
            const speciality = await connect.select("*").from("speciality")
            return res.status(200).json(speciality)
        } catch(e) {
            console.log(e)
            return res.status(400).json("Error")
        }
    }
}

module.exports = new receptionsController()