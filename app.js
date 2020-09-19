const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./router/auth")
const connectdb =require("./config/db")
const app =express();

connectdb()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.json())

app.use(routes)
app.listen(4000);