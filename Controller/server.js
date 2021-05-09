const http=require('http');
const fs=require('fs')
const model =require('../Model/findAnomalies')

function displayFormCommand(req, res){
    fs.readFile('../View/index.html','utf8',(err,data)=>{
        if(err)
            console.log(err)
        else
            res.write(data)
            res.end()
    })
}

function findAnomalies(req,res){
    var result = model.findAnomalies(train, test)
    res.write(result)
    res.end()
}

let commands = new Map()
commands.set('/',displayFormCommand)
commands.set('/search', findAnomalies)

const server = http.createServer((req,res)=>{
    if(commands.has(req.url))
        commands.get(req.url)(req,res)
    else
        res.write("Invalid request")
})
server.listen(8080, ()=>console.log("server started on port 8080"))