const connectMongo = require("./db")
const express = require('express');
const { Router } = require("express");
var cors = require('cors')

connectMongo();
var app = express()
app.use(express.json())
const port = 5000

app.use(cors())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))

app.listen(port, () => {
  console.log(`Inotebook app listening on port ${port}`)
})