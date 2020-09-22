const routes = require('express').Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')

routes.post('/sendPhoto', (req, res) => {
    // const raw = new Buffer(req.file.buffer.toString(), 'base64')
    // console.log(raw)
    // console.log("params: ", req.params);
    // console.log("body: ", req.body);
    try {
        res.json({"ok":"ok"})
    } catch (e) {
        res.send(`Error:${e} `)
    }

    // fs.writeFile(path.resolve(__dirname, 'public', images), raw, (err) => {
    //     if (err) { return next(err) }

    //     res.send('Funcionando')
    // })

})


module.exports = routes