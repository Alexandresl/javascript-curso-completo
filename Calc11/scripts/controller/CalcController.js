class CalcController {

    constructor() {

        this._displayCalcEl = document.querySelector('#display-main');
        this._dateEl = document.querySelector('.display-date');
        this._timeEl = document.querySelector('.display-time');
        this._histpricEl = document.querySelector('#display-historic');
        this._audioEl = document.querySelector('.display-audio');
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

    get histpricEl() {

        return this._histpricEl.innerHTML;

    }

    set histpricEl(value) {

        this._histpricEl.innerHTML = value;

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
        this.dateEl = '20/01/2019';
        this.timeEl = '12:01';
        this.histpricEl = '11 + 11';
        this.audioEl = '♪';

    }

}