function  findAnomalies(train, test){
    let result='1\n'
    train.split("\n").forEach(row=>{
        result+= row+'\n'
    })
    result += 'done\n'
    test.split("\n").forEach(row=>{
        result+= row+'\n'
    })
    result += 'done\n'
    //TODO Send to server from first semester
    return result
}

module.exports.findAnomalies = findAnomalies