class CalcController {

    constructor() {

        this._displayCalcEl = document.querySelector("#display-main");
        this._dateEl = document.querySelector(".display-date");
        this._timeEl = document.querySelector(".display-time");
        this._historicEl = document.querySelector("#display-historic");
        this._audioEl = document.querySelector(".display-audio");
        this._currentDate = '';
        this.initialize();

    }

    get displayCalcEl() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalcEl(value) {

        this._displayCalcEl.innerHTML = value;

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

    get historicEl() {

        return this._historicEl.innerHTML;

    }

    set historicEl(value) {

        this._historicEl.innerHTML = value;

    }

    get audioEl() {

        return this._audioEl.innerHTML;

    }

    set audioEl(value) {

        this._audioEl.innerHTML = value;

    }

    get currentDate() {

        return this._currentDate;

    }

    set currentDate(value) {

        this._currentDate = value;

    }

    initialize() {

        this.displayCalcEl = 0;
        this.dateEl = '08/01/2019';
        this.timeEl = '23:22';
        this.historicEl = '1 + 1';
        this.audioEl = '♪';

    }

}