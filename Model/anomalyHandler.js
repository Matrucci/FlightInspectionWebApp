const { json } = require("express");
const { HybridAnomalyDetector } = require("./AnomalyDetectionAlg/HybridAnomalyDetector");
const { SimpleAnomalyDetector } = require("./AnomalyDetectionAlg/SimpleAnomalyDetector");
const {TimeSeries} = require("./AnomalyDetectionAlg/TimeSeries");
const TSMap = require("typescript-map").TSMap;

class AnomalyManager {
    constructor(detector) {
        this._detector = detector;
        this._train = null;
        this._test = null;
    }

    uploadTrain(trainJson) {
        this._train = new TimeSeries(trainJson);
    }

    uploadTest(testJson) {
        this._test = new TimeSeries(testJson);
    }

    getFeatures() {
        return this._test.getFeatures();
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

function findAnomalies(train, test, key){
    mapCsvTrain = parseCsv(train);
    mapCsvTest = parseCsv(test);
    if (key == 2) { //circle
        let am = new AnomalyManager(new HybridAnomalyDetector(0.5));
        am.uploadTrain(mapCsvTrain);
        am.uploadTest(mapCsvTest);
        am.learn();
        am.detect();
        output = buildAnomalyReport(am);
        return output;
    } else if (key == 1) { //line
        let am = new AnomalyManager(new SimpleAnomalyDetector(0.9));
        am.uploadTrain(mapCsvTrain);
        am.uploadTest(mapCsvTest);
        am.learn();
        am.detect();
        output = buildAnomalyReport(am);
        return output;
    }

    function buildAnomalyReport(am) {
        let anomalyMap = new TSMap();
        titles = [];
        titles = am.getFeatures();
        for(let i = 0; i < titles.length; i++) {
            anomaly = am.getAnomalies(titles[i]);
            if (anomaly && anomaly[0]) {
                
                if (!anomalyMap.has(am.mostCorrelative(titles[i]) + " - " + titles[i])) {
                    anomalyMap.set(titles[i] + " - " + am.mostCorrelative(titles[i]), anomaly);
                }
                
            }
        }
        return anomalyMap.toJSON();
    }

}

function parseCsv(csvStringFile) {
    let map = {};
    let lines = csvStringFile.split('\n');

    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split('\r')[0];
    }

    let lineIndex = 0;
    let line = lines[lineIndex];
    let featuresList = line.split(',');
    Features = featuresList;
    let columnsSize = featuresList.length;

    let tampMap = {};
    for (let i = 0; i < featuresList.length; i++) {
        let j = 2;
        while (featuresList[i] in tampMap) {
            featuresList[i] = featuresList[i] + j.toString();
            j++;
        }
        tampMap[featuresList[i]] = [];
    }
    for (let feature of featuresList) {
        map[feature] = [];
    }
    let isFirst = true;
    for (const line of lines) {
        if (!isFirst) {
            let arr = [];
            for (const value of line.split(',')) {
                arr.push(parseFloat(value));
            }
            for (let i = 0; i < columnsSize; i++) {
                map[featuresList[i]].push(arr[i])
			}
            arr = [];
        }
        isFirst = false;
    }
    for (let feature of featuresList) {
        map[feature].pop();
    }
    return map;
}
module.exports.findAnomalies = findAnomalies