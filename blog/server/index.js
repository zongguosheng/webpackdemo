const path = require('path')
const userApi = require('./api/api')
const fs = require('fs')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// const router = express.Router()

// app.get('/', (req, res, next) => res.send('Hello World!'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 后端api路由
app.use('/api/user', userApi)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
