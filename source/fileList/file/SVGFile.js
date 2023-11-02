export class SVGfile {
    _data;

    constructor(svgArray, FileName) {
        this._data = {
            svgArray: svgArray,
            fileName: FileName,
        }
    }

    get data() {
        return this._data;
    }
}
