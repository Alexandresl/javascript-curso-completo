class CalcController {

    constructor() {

        this._displayCalc = '';
        this._currentDate = '';

    }

    get displayCalc() {

        return this.displayCalc;

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