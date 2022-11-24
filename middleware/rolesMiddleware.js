const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (roles) {
    return function (req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }
    
        try {
            console.log(req.headers)
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Не авторизован"})
            }
            const {roles: userRoles} = jwt.verify(token, secret) 
            let hasRole = false
            if (userRoles == roles) {
                hasRole = true
            }
            if (!hasRole) {
                return res.status(200).json({message: "нет прав"})
            }
            next()
        } catch(e) {
            console.log(e)
            return res.status(403).json({message: "Не авторизован"})
        } 
    }
}