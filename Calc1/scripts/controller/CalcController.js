class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display-main");
        this._dateEl = document.querySelector(".display-date");
        this._timeEl = document.querySelector(".display-time");
        this._historicEl = document.querySelector("#display-historic");
        this._audioEl = document.querySelector(".display-audio");
        this._currentDate = "";
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

    setDisplayDateTime() {

        this.dateEl = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        this.timeEl = this.currentDate.toLocaleTimeString(this._locale);

    }

    addEventListenerAll(el, events, fn) {

        events.split(" ").forEach(event => {

            el.addEventListener(event, fn);

        });

    }

    clearAll() {

        this._operation = [];

    }

    clearEntry() {

        this._operation.pop();

    }

    setError() {

        this.displayCalcEl = 'Error';

    }

    addOperation(value) {

        this._operation.push(value);

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

                break;
            
            case 'subtracao':

                break;
            
            case 'multiplicacao':

                break;
            
            case 'divisao':

                break;
            
            case 'porcento':

                break;
            
            case 'igual':

                break;
            
            case 'ponto':

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

        let buttons = document.querySelectorAll("#keyboard > ul > li");

        buttons.forEach(btn => {

            this.addEventListenerAll(btn, 'click drag', () => {

                let textBtn = btn.className.replace('btn-', '');

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', () => {

                btn.style.cursor = 'pointer';

            })

        });

    }

}