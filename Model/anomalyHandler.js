const {TimeSeries} = require("./AnomalyDetectionAlg/TimeSeries");

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




class AnomalyManager{
    constructor(detector) {
        this._detector = detector;
        this._train = null;
        this._test = null;
    }

    uploadTrain(trainJson){
        this._train = new TimeSeries(trainJson);
    }

    uploadTest(testJson){
        this._test = new TimeSeries(testJson);
    }

    learn(){
        this._detector.learnNormal(this._train);
    }

    detect(){
        this._detector.detect(this._test);
    }

    mostCorrelative(column){
        let cf = this._detector._cf;
        for(let corr of cf) {
            if (corr._feature1 === column) {
                return corr._feature2;
            }
        }
        return "no most correlative";
    }

    getAnomalies(column){
        let cf = this._detector._cf;
        for (let c of cf){
            if (c._feature1 === column){
                let prevTimeStep = 0;
                let isFirst = true;
                let anomalies = [];
                let str = [];
                for (let timeStep of c._anomaliesTimeStep){
                    if (isFirst || timeStep-prevTimeStep > 1){
                        if (!isFirst){
                            str.push(prevTimeStep);
                            anomalies.push(str);
                            str = []
                        }
                        str.push(timeStep);
                        isFirst = false;
                    }
                    prevTimeStep = timeStep;
                }
                if (!isFirst){
                    str.push(prevTimeStep);
                    anomalies.push(str);
                }
                return anomalies;
            }
        }
    }
}

module.exports.findAnomalies = findAnomalies