class CalcController {

    // Método construtor

    constructor () {

        // Números que aparecem do displayMain
        this._displayCalc = "0";
        // data
        this._currentDate = '';
        // método com serviços necessários durante a inicialização da calculadora
        this.initialize();

    }

    // Métodos sertters and getters

    get displayCalc () {
        return this._displayCalc;
    }

    set displayCalc (value) {
        this._displayCalc = value;
    }

    get currentDate () {
        return this._currentDate;
    }

    set currentDate (value) {
        this._currentDate = value;
    }

    // Método que inicia a calculadora
    initialize() {

        let displayCalcEl = document.querySelector("#displayMain");
        let displayTimeEl = document.querySelector("#displayTime");
        let displayDateEl = document.querySelector("#displayDate");

        displayCalcEl.innerHTML = "4567";
        displayTimeEl.innerHTML = "00:14:58";
        displayDateEl.innerHTML = "13 de setembro de 2018";

    }

}