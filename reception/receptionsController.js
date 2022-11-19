const connect = require('../knex')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

class receptionsController {
    async get(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Не авторизован"})
            }
            const {roles, username} = jwt.verify(token, secret)
            if (roles == 2) {
                const receptions = await connect.select("*").from("reception")
                return res.status(200).json(receptions)
            }
            if (roles == 1) {
                const receptions = await connect.select("*").from("reception").where("username", username)
                return res.status(200).json(receptions)
            }
        } catch(e) {
            console.log(e)
            return res.status(400).json("Error")
        }
    }

    async create(req, res) {
        try {
            const {fname, sname, patronymic, doctor_id, date} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Не авторизован"})
            }
            const {username} = jwt.verify(token, secret)
            console.log(username) 
            const receptions = {fname, sname, patronymic, doctor_id, date, username}
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

// date = 17 november 2022  /////// 10:30????

    async getFreeDate(req, res) {
        try {
            const {doctor_id, selected_date} = req.params
            const reception = await connect("reception").where("doctor_id", Number(doctor_id))
            const allDate = ['9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11.15', '11:30']
            if (reception.length) {
                for (let i = 0; i < reception.length; ++i) {
                const date = reception[i].date
                const dateRec = date.split(' ')
                console.log(dateRec[0] + ' ' + dateRec[1] + ' ' + dateRec[2])
                console.log(selected_date)
                if (dateRec[0] + ' ' + dateRec[1] + ' ' + dateRec[2] == selected_date) {
                    for (let t = 0; t < allDate.length; ++t) {
                        if (allDate[t] == dateRec[3]) {
                            console.log(allDate[t])
                            console.log(dateRec[3])
                            allDate.splice(t, 1)
                        }
                    }
                }
                console.log(allDate)
                }
                return res.status(200).json(allDate)
            }
            return res.status(200).json(allDate)
        } catch(e) {
            console.log(e)
            return res.status(400).json("Error")
        }
    }
}

module.exports = new receptionsController()