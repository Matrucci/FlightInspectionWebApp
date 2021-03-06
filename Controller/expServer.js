const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../Model/anomalyHandler')

const app = express()
app.use(express.urlencoded({
    extended: false
}))
app.use(fileUpload())
app.use(express.static('../View'))
app.get("/", (req, res) => {
    res.sendFile("index.html")
})
app.post("/detect", async (req, res) => {
    let type = req.body.select;
    var key;
    if (type == 'line') {
        key = 1
    } else if (type == 'circle') {
        key = 2
    }
    if(req.files) {
        let trainFile = req.files.train_file
        let testFile = req.files.test_file
        if (testFile && trainFile) {
            let result = await model.findAnomalies(trainFile.data.toString(), testFile.data.toString(), key);
            res.json(result);
        } else {
            res.write("Please upload both files")
        }
    } else {
        res.write("Please upload both files")
    }
    res.end()
})
app.listen(8080)