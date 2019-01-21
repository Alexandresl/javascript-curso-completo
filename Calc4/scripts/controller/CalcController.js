class CalcController {

    constructor() {

        this._historic = [];
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display-main');
        this._dateEl = document.querySelector('.display-date');
        this._timeEl = document.querySelector('.display-time');
        this._historicEl = document.querySelector('#display-historic');
        this._audioEl = document.querySelector('.display-audio');
        this._currentDate = '';
        this.initialize();
        this.initButtonsEvents();

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

        return new Date();

    }

    set currentDate(value) {

        this._currentDate = value;

    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

    }

    addEventListenerAll(el, events, fn) {

        events.split(' ').forEach(event => {

            el.addEventListener(event, fn);

        })

    }

    clearAll() {

        this._operation = [];

        this.clearAllHistoric();

    }

    clearEntry() {

        this._operation.pop();

        this.clearEntryHistoric();

    }

    clearAllHistoric() {

        this._historic = [];

    }

    clearEntryHistoric() {

        this._historic.pop();

    }

    pushHistoric(value) {

        this._historic.push(value);

    }

    getLastHistoric() {

        return this._historic[this._historic.length - 1];

    }

    addHistoric() {

        if (
            this._historic.length > 0 &&
            !this.isOperator(this.getLastHistoric()) &&
            !this.isOperator(this.getLastOperation()) ||
            this.isOperator(this.getLastHistoric()) &&
            this.isOperator(this.getLastOperation())
        ) {

            this.setLastHistoric(this.getLastOperation());

        } else {

            this.pushHistoric(this.getLastOperation());

        }

    }

    setHistoricToDisplay(validation = true) {

        if (isNaN(this.getLastHistoric()) || !validation) {

            this.historicEl = this._historic.join(' ');

        }

    }

    setLastHistoric(value) {

        this._historic[this._historic.length - 1] = value;

    }

    setError() {

        this.displayCalcEl = 'Error';

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    setLastNumberToDisplay() {

        let lastNumber;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (!this.isOperator(this._operation[i])) {

                lastNumber = this._operation[i];

                break;

            }

        }

        this.displayCalcEl = lastNumber;

    }

    calc() {

        let last = this._operation.pop();

        let result = eval(this._operation.join(''));

        this._operation = [result, last];

        this.setLastNumberToDisplay();

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

    }

    isOperator(value) {

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1)

    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            // String

            if (this.isOperator(value)) {

                // Change operator

                this.setLastOperation(value);

            } else if (isNaN(value)) {

                // Dot

            } else {

                // First Number

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        } else {

            // Number

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();

                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }

        this.addHistoric();

        this.setHistoricToDisplay();

        console.log('this._historic', this._historic);

        console.log('this._operation', this._operation);

    }

    execBtn(value) {

        switch (value) {

            case 'c':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':

                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();

        }

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll('#keyboard > ul > li');

        buttons.forEach(btn => {

            this.addEventListenerAll(btn, 'click drag', () => {

                let textBtn = btn.className.replace('btn-', '');

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', () => {

                btn.style.cursor = 'pointer';

            });

        });

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