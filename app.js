const express = require('express')
const bp = require('body-parser')

const authRouter = require('./authRouter')
const cabinetsRouter = require('./cabinets/cabinetsRouter')
const doctorsRouter = require('./doctors/doctorsRouter')
const receptionsRouter = require('./reception/receptionsRouter')

const PORT = 5000

const app = express()
app.use(bp.json())
app.use("/auth", authRouter)
app.use("/cabinet", cabinetsRouter)
app.use("/doctor", doctorsRouter)
app.use("/reception", receptionsRouter)

app.listen(PORT, () => {console.log('working')})
