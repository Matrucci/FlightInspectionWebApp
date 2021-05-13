const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('./anomalyHandler')

const app = express()
app.use(express.urlencoded({
    extended: false
}))
app.use(fileUpload())
app.use(express.static('../View'))
app.get("/", (req, res) => {
    res.sendFile("index.html")
})
app.post("/search", (req, res) => {
    let type = req.body.algorithms
    var key
    if (type == 'line') {
        key = 6
    } else if (type == 'circle') {
        key = 3
    }
    if(req.files) {
        //console.log(req.files)
        let trainFile = req.files.train_file
        let testFile = req.files.test_file
        let result = model.findAnomalies(trainFile.data.toString(), testFile.data.toString(), key)
        res.write(result)
    }
    res.end()
})
app.listen(8080)