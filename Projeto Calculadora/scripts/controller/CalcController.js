class CalcController {

    constructor() {
        this._displayCalc = "0";
        this._currentDate;
        this.initialize();
    }

    get displayCalc() {
        return this._displayCalc;
    }

    set displayCalc(value) {
        this._displayCalc = value; 
    }

    get currentDate() {
        return this.currentDate;
    }

    set currentDate(value) {
        this.currentDate = value;
    }

    initialize() {
        let displayCalcEl = document.querySelector('#display');
        let dateEl = document.querySelector('#data');
        let horaEl = document.querySelector('#hora');
        displayCalcEl.innerHTML = "1234";
        dateEl.innerHTML = "15/01/2021";
        horaEl.innerHTML = "12:09"
    }

}