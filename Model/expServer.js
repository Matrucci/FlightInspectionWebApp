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
    //console.log(req.body.threshold)
    let threshold = req.body.threshold;
    let floatThreshold = 0.9
    if (threshold) {
        threshold = "0." + threshold;
        floatThreshold = parseFloat(threshold);
    }
    let type = req.body.select;
    var key
    if (type == 'line') {
        key = 1
    } else if (type == 'circle') {
        key = 2
    }
    console.log(floatThreshold);
    
    if(req.files) {
        //console.log(req.files)
        let trainFile = req.files.train_file
        let testFile = req.files.test_file
        if (testFile && trainFile) {
            let result = model.findAnomalies(trainFile.data.toString(), testFile.data.toString(), key, floatThreshold);
            res.write(result)
        } else {
            res.write("Please upload both files")
        }
    } else {
        res.write("Please upload both files")
    }
    res.end()
})
app.listen(8080)