const express = require('express')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const morgan = require('morgan');
const path = require('path')

const app = express();
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('./serveFiles/public'))
app.use(express.static('./serveFiles/public/images/'))

app.get('/',(req,res)=>{
    res.send('ok')
})

keyServer = path.resolve(__dirname,'certificates','server.key')
certServer = path.resolve(__dirname,'certificates','server.cert')
https.createServer({
    key:fs.readFileSync(keyServer),
    cert:fs.readFileSync(certServer)
}, app).listen(5500, () => {
    console.log('Server Running !!')
})