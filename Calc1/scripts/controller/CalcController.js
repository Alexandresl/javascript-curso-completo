/**
 * Classe CalcController
 */
class CalcController {

    constructor() {

        this._displayCalcEl = document.querySelector("#display-main");
        this._timeEl = document.querySelector(".display-time");
        this._dateEl = document.querySelector(".display-date");

        this._currentDate = "13/12/2018";
        this.initialize();

    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate() {

        return this._currentDate;

    }

    set currentDate(value) {

        this._currentDate = value;

    }

    get dateEl() {

        return this._dateEl.innerHTML;

    }

    set dateEl(value) {

        this._dateEl.innerHTML = value;

    }

    get timeEl() {

        return this._timeEl.innerHTML;

    }

    set timeEl(value) {

        this._timeEl.innerHTML = value;

    }

    initialize() {

        this.displayCalc = "10";
        this.dateEl = "14/12/2018";
        this.timeEl = "08:40";

    }

}