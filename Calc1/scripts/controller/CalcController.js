/**
 * Classe CalcController
 */
class CalcController {

    constructor() {

        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display-main");
        this._timeEl = document.querySelector(".display-time");
        this._dateEl = document.querySelector(".display-date");
        this._currentDate = "";
        this.initialize();

    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate() {

        return new Date();

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

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

    }

    setDisplayDateTime() {

        this.dateEl = this.currentDate.toLocaleDateString(this._locale, {

            day: '2-digit',
            month: 'long',
            year: 'numeric'

        });
        this.timeEl = this.currentDate.toLocaleTimeString(this._locale);

    }

}