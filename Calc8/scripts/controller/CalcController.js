class CalcController {

    constructor() {

        this._displayCalc = "0";
        this.currentDate = "14/12/2018";

    }

    get displayCalc() {

        return this._displayCalc;

    }

    set displayCalc(value) {

        this._displayCalc = value;
        
    }

    get currentDate() {

        return this._currentDate;

    }

    set currentDate(value) {

        this._currentDate = value;

    }

}