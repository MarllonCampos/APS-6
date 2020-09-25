const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const https = require('https')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer()


const app = express()

app.use(cors())
app.use(morgan('dev'))


app.get('/',(req,res)=>{
    res.send('Server Running!')
})

app.post('/sendVideo',upload.single("file"),(req,res)=>{
    console.log(req.file)
    res.json({ok:"sei la"})


})

keyServer = path.resolve(__dirname,'serveFiles','certificates','server.key')
certServer = path.resolve(__dirname,'serveFiles','certificates','server.cert')



https.createServer({
    key:fs.readFileSync(keyServer),
    cert:fs.readFileSync(certServer)
},app).listen(3000,()=> {
    console.log('Server Running!!')
})
