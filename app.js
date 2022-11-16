const express = require('express')
const bp = require('body-parser')

const authRouter = require('./authRouter')

const PORT = 5000

const app = express()
app.use(bp.json())
app.use("/auth", authRouter)

app.listen(PORT, () => {console.log('working')})
