const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const cookieParser = require('cookie-parser')
require("dotenv").config()
const port = process.env.PORT || 5000
const db = require('./models')
const users = require('./routes/Users')
const user = require('./routes/User')
//middleware
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));
app.use(cookieParser())

app.use('/',users)
app.use('/',user)

db.sequelize.sync().then(() => {
app.listen(port, () => console.log(`Server running on port ${port}`))
})