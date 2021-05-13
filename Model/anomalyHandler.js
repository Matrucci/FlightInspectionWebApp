function  findAnomalies(train, test, key){
    let result='1\n'
    train.split("\n").forEach(row=>{
        result+= row+'\n'
    })
    result += 'done\n'
    test.split("\n").forEach(row=>{
        result+= row+'\n'
    })
    result += 'done\n'
    result += key + '\n'
    result += '4\n'

    output = sendToServer(result)
    output += ' ' + key + '\n'

    //TODO Send to server from first semester
    return output
}

function sendToServer(input) {
    //TODO send to server and build JSON
    return "A-B     135"
}

module.exports.findAnomalies = findAnomalies