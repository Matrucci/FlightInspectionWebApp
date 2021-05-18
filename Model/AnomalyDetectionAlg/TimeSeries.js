class TimeSeries {
    constructor(CsvJson) {
        this.csvMap = new Map();
        this.featureTitles = [];
        //this.csvMap = JSON.parse(JSON.stringify(CsvJson));
        this.csvMap = CsvJson;
        this.featureTitles = Object.keys(this.csvMap);
        this.columns = this.csvMap[this.featureTitles[0]].length;
        this.rows = this.featureTitles.length;
    }

    getColumn(key) {
        return typeof this.csvMap[key] !== "undefined" ? this.csvMap[key] : [];
    }

    getColumnSize() {
        return this.columns;
    }

    getRowSize() {
        return this.rows;
    }

    getFeatures() {
        return this.featureTitles;
    }
}

module.exports = {TimeSeries};