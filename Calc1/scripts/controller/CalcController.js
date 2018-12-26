class CalcController {

    constructor() {

        this._operation = [];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display-main");
        this._dateEl = document.querySelector(".display-date");
        this._timeEl = document.querySelector(".display-time");
        this._currentDate = "";
        this.initialize();
        this.initButtonsEvents();
        this.setLastNumberToDisplay();

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

    addEventListenerAll(element, events, fn) {

        events.split(" ").forEach(event => {

            element.addEventListener(event, fn);

        });

    }

    clearAll() {
        
        this._operation = [];

        this.setLastNumberToDisplay();        

    }

    clearEntry() {

        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    setError() {

        this.displayCalc = "Error";

    }

    isOperator(value) {

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value

    }

    calcPercent() {

        let percent;

        if (this.getLastOperatorExceptPercent() === "*" || this.getLastOperatorExceptPercent() == "/") {

            percent = this.getLastNumber() / 100;

        } else {

            percent = this._operation[0] * this.getLastNumber() / 100;
            
        }

        this.setLastOperation(percent);

    }

    calc() {

        let last = "";

        if (this._operation.length > 3) {

            last = this._operation.pop();

        }

        if (last === "%") {

            this.calcPercent();

        } else {

            if (this.getLastOperation() === "%") {              

                this.calcPercent();

            } else {

                let result = eval(this._operation.join(""));
                
                if (result) this._operation = [result];

                if (last) this._operation.push(last);

            }

        }

        this.setLastNumberToDisplay();

    }

    getLastOperatorExceptPercent() {

        let lastOperator;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) && this._operation[i] !== "%") {

                lastOperator = this._operation[i];

                break;

            }

        }

        return lastOperator;

    }

    getLastNumber() {

        let lastNumber;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (!this.isOperator(this._operation[i])) {

                lastNumber = this._operation[i];

                break;

            }

        }

        return lastNumber;

    }

    setLastNumberToDisplay() {

        let lastNumber = this.getLastNumber();

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length < 3) {

            if (value === "%") {

                this.clearAll();

            }

        } else if (this._operation.length > 3) {

            this.calc();

        }

    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            // String

            if (this.isOperator(value)) {

                // Substitui o operador

                if (value !== "%") {

                    this.setLastOperation(value);

                } else if (value === "%" && this._operation.length > 0) {

                    this.pushOperation(value);

                    this.calc();

                }



            } else if (isNaN(value)) {

                // Ponto

            } else {

                // Primeiro número

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        } else {

            // Número

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();

                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }

        console.log('addOperation(): ', this._operation);

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

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
                this.calc();;
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
                break;

        }

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#keyboard > ul > li");

        buttons.forEach(btn => {

            this.addEventListenerAll(btn, "click drag", () => {

                let textBtn = btn.className.replace("btn-", "");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", () => {

                btn.style.cursor = "pointer";

            });

        });

    }

}