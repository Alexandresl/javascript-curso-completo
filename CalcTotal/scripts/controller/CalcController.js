class CalcController {

    constructor() {

        this._operation = [];
        this._location = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display-main");
        this._dateEl = document.querySelector(".display-date");
        this._timeEl = document.querySelector(".display-time");
        this._currentDate = "";
        this.initialize();
        this.initButtonsEvents();

    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

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

    setDisplayDateTime() {

        this.dateEl = this.currentDate.toLocaleDateString(this._location, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.timeEl = this.currentDate.toLocaleTimeString(this._location);

    }

    addEventListenerAll(element, events, fn) {

        events.split(" ").forEach(event => {

            element.addEventListener(event, fn);

        });

    }

    clearAll() {

        this._operation = [];

    }

    clearEntry() {

        this._operation.pop();

    }

    setError() {

        this.displayCalc = "Error";

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    isOperator(value) {

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);

    }

    calc() {

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last];

    }

    setLastNumberToDisplay() {

        

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            // String

            if (this.isOperator(value)) {

                // Trocar o operador

                this.setLastOperation(value);

            } else if (isNaN(value)) {

                // Ponto

            } else {

                this.pushOperation(value);

            }

        } else {

            // Number

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();

                this.setLastOperation(parseInt(newValue));

            }

        }

        console.log(this._operation);

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
                break;

        }

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#keyboard > ul > li");

        buttons.forEach(btn => {

            this.addEventListenerAll(btn, 'click drag', () => {

                let textBtn = btn.className.replace("btn-", "");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', () => {

                btn.style.cursor = "pointer";

            }); 

        });

    }

}