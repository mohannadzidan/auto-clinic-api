require("dotenv").config()
const accessLogMiddleware = require("./middlewares/logger.middleware")
const { api } = require('./routes/index.routes');

const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(api)
module.exports = app
