const express = require('express')
const cors = require('cors');
const bp = require('body-parser')

const authRouter = require('./authRouter')
const cabinetsRouter = require('./cabinets/cabinetsRouter')
const doctorsRouter = require('./doctors/doctorsRouter')
const receptionsRouter = require('./reception/receptionsRouter')
const specialityRouter = require('./speciality/specialityRouter')

const PORT = 5000

const app = express()
const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
app.use(bp.json())
app.use("/auth", authRouter)
app.use("/cabinet", cabinetsRouter)
app.use("/doctor", doctorsRouter)
app.use("/reception", receptionsRouter)
app.use("/speciality", specialityRouter)

app.listen(PORT, () => {console.log('working')})
