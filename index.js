require('dotenv').config()
const express = require('express')
const SiteController = require('./controllers/SiteController')
const connectDB = require('./db/database')
const app = express()

connectDB()


app.get('/',(req, res)=>res.send('Hello Worlds'))
app.get('/teste/:url', SiteController.request)
app.post('/salve_info/:url', SiteController.save_info)
app.post('/get_info/:url', SiteController.return_info)

app.listen(3003,()=>console.log('rodando em http://localhost:3003'))