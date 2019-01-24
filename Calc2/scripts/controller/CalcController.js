class CalcController {

    constructor() {

        this._lastOperator = '';
        this._lastNumber = '';
        this._toContinue = true;
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

        this.setLastNumberToDisplay();

    }

    addEventListenerAll(el, events, fn) {

        events.split(' ').forEach(event => {

            el.addEventListener(event, fn);

        });

    }

    clearAllHistoric() {

        this._historic = [];

        this.setHistoricToDisplay(false);

    }

    clearEntryHistoric() {

        this._historic.pop();

        this.setHistoricToDisplay(false);

    }

    pushHistoric(value) {

        if (value) this._historic.push(value);

    }

    getLastHistoric() {

        return this._historic[this._historic.length - 1];

    }

    setLastHistoric(value) {

        this._historic[this._historic.length - 1] = value;

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

    clearAll() {

        this._operation = [];

        this._lastNumber = '';

        this._lastOperator = '';

        this.clearAllHistoric();

        this.setLastNumberToDisplay();

    }

    clearEntry() {

        this._operation.pop();

        this.clearEntryHistoric();

        this.setLastNumberToDisplay();

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

    getOperatorExceptPercent() {

        let lastOperator;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) && this._operation[i] !== '%') {

                lastOperator = this._operation[i];

                break;

            }

        }

        return lastOperator

    }

    getItem(isOperator = true, last = true) {

        let lastItem;

        if (last) {

            for (let i = this._operation.length - 1; i >= 0; i--) {

                if (this.isOperator(this._operation[i]) === isOperator) {

                    lastItem = this._operation[i];

                    break;

                }

            }

        } else {

            for (let i = 0; i <= this._operation.length - 1; i++) {

                if (this.isOperator(this._operation[i]) === isOperator) {

                    lastItem = this._operation[i];

                    break;

                }

            }

        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }

    setLastNumberToDisplay() {

        let lastNumber = this.getItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalcEl = lastNumber;

    }

    calcPercent() {

        let percent;

        if (
            this.getOperatorExceptPercent() === '*' ||
            this.getOperatorExceptPercent() === '/'
        ) {

            percent = this.getItem(false) / 100;

        } else {

            percent = this.getItem(false, false) * this.getItem(false) / 100;

        }

        this.setLastOperation(percent);

        this.addHistoric();

        this.setHistoricToDisplay(false);

    }

    getResult() {

        return eval(this._operation.join(''));

    }

    calc(toContinue = true) {

        if (this._operation.length === 0) return;

        let last;

        this._toContinue = toContinue;

        this._lastOperator = this.getItem();

        if (this._operation.length < 3) {

            let firstNumber = this.getItem(false, false);

            if (!this._lastNumber) this._lastNumber = firstNumber;

            this._operation = [firstNumber, this._lastOperator, this._lastNumber];

            this.clearAllHistoric();

            this.setHistoricToDisplay();

        }

        if (this._operation.length > 3) {

            last = this._operation.pop();

            this._lastNumber = this.getResult();

        } else if (this._operation.length === 3) {

            this._lastNumber = this.getItem(false);

        }

        if (last === '%') {

            this.calcPercent();

        } else {

            if (this.getItem() === '%') {

                this.calcPercent();

            } else {

                let result = this.getResult();

                this._operation = [result];

                if (last) this._operation.push(last);

            }

        }

        if (this._toContinue === false) {

            this.clearAllHistoric();

            this.setHistoricToDisplay();

        }

        this.setLastNumberToDisplay();

    }

    pushOperation(value) {
        
        /* if (!this._operation[0]) {

            this.clearAll();

            this._toContinue = true;

        }  */

        this._operation.push(value);

        if (this._operation.length < 3) {

            if (value === '%') {

                this.clearAll();

            }

        } else if (this._operation.length > 3) {

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

                // Trocar o operador

                if (value !== '%') {

                    this.setLastOperation(value);

                } else {

                    this.pushOperation(value);

                    this.calc();

                }

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

                if (this._toContinue === true) {

                    let newValue = this.getLastOperation().toString() + value.toString();

                    this.setLastOperation(newValue);

                } else {

                    this.clearAll();

                    this.pushOperation(value);

                    this._toContinue = true;

                }

                this.setLastNumberToDisplay();

            }

        }

        this.addHistoric();

        this.setHistoricToDisplay();

        console.log('this._historic: ', this._historic);

        console.log('this._operation: ',this._operation);

    }

    addDot() {

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {

            this.pushOperation('0.');

        } else {

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();

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
                this.calc(false);
                break;
            
            case 'ponto':
                this.addDot();
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