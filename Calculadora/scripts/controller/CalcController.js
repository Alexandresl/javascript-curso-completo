/**
 * Classe CalcController
 * 
 * Irá conter as regras de negócio da calculadora.
 * 
 */

class CalcController {

    /**
     * Método construtor da classe CalcController.
     */
    constructor() {

        this._locale = 'pt-BR';
        this._currentDate;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();

    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000);

    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get currentDate() {

        return new Date();

    }

    set currentDate(value) {

        this._currentDate.innerHTML = value;

    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        this._displayCalcEl.innerHTML = value;

    }

    get displayTime() {

        return this._timeEl.innerHTML;

    }

    set displayTime(value) {

        this._timeEl.innerHTML = value;

    }

    get displayDate() {

        return this._dateEl.innerHTML;

    }

    set displayDate(value) {

        this._dateEl.innerHTML = value;

    }

}