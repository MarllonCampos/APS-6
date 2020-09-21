const express = require('express')
const cors = require('cors')
const app = express();
const multer = require('multer')

app.use(cors())
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('/public/index.html')
})

app.post('/image',(req,res) => {

})


app.listen(5500)
