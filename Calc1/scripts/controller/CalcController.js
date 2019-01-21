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

        })

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

    clearAllHistoric() {

        this._historic = [];

        this.setHistoricToDisplay(false);

    }

    clearEntryHistoric() {

        this._historic.pop();

        this.setHistoricToDisplay(false);

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

    getLastOperatorExceptPercent() {

        let lastOperator;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) && this._operation[i] !== '%') {

                lastOperator = this._operation[i];

                break;

            }

        }

        return lastOperator;

    }

    getfirstNumber() {

        let firstNumber;

        for (let i = 0; i <= this._operation.length - 1; i++) {

            if (!this.isOperator(this._operation[i])) {

                firstNumber = this._operation[i];

                break;

            }

        }

        return firstNumber;

    }

    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) === isOperator) {

                lastItem = this._operation[i];

                break;

            }

        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }

    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalcEl = lastNumber;

    }

    calcPercent() {

        let percent;

        if (
            this.getLastOperatorExceptPercent() === '*' ||
            this.getLastOperatorExceptPercent() === '/'
        ) {

            percent = this.getLastItem(false) / 100;

        } else {

            percent = this.getfirstNumber() * this.getLastItem(false) / 100;

        }

        this.setLastOperation(percent);

        this.addHistoric();

        this.setHistoricToDisplay(false);

    }

    getResult() {

        return eval(this._operation.join(''));

    }

    calc(toContinue = true) {

        let last;

        this._toContinue = toContinue;

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstNumber = this.getfirstNumber();

            this._operation = [firstNumber, this._lastOperator, this._lastNumber];

            this.clearAllHistoric();

            this.setHistoricToDisplay();

        }

        if (this._operation.length > 3) {
            
            last = this._operation.pop();            

            this._lastNumber = this.getResult();

        } else if (this._operation.length === 3) {

            this._lastNumber = this.getLastItem(false);

        }

        if (last === '%') {

            this.calcPercent();

        } else {

            if (this.getLastOperation() === '%') {

                this.calcPercent();

            } else {

                let result = this.getResult();

                this._operation = [result];

                if (last) this.pushOperation(last);

            }

        }

        this.setLastNumberToDisplay();

    }

    pushOperation(value) {

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

            if(this.isOperator(value)) {

                // Change operator

                if (value !== '%') {

                    this.setLastOperation(value);

                } else {

                    this.pushOperation(value);

                    this.calc();

                }

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

                this._toContinue = true;

            } else {

                if (this._toContinue === true) {

                    let newValue = this.getLastOperation().toString() + value.toString();

                    this.setLastOperation(parseInt(newValue));

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

        console.log('this._historic', this._historic);

        console.log('this._operation',this._operation);

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