class CalcController {

    /**
     * método construtor.
     * Irá conter os atributos da classe CalcController.
     */
    constructor() {
        // Atributo que determina o locale
        this._locale = "pt-BR";
        // Seleciona o elemento que exibe a hora no display
        this._timeEl = document.querySelector(".display-time");
        // Seleciona o elemento que exibe a data no display
        this._dateEl = document.querySelector(".display-date");
        // Seleciona o elemento principal do display
        this._displayCalcEl = document.querySelector("#display-main");
        // Chamada para o método initialize()
        this.initialize();
        // Inicializa a escuta para os eventos dos botões
        this.initButtonsEvents();

    }

    /**
     * Método que será executado assim que a calculadora 
     * for inicializada.
     */
    initialize() {

        /**
         * irá atualizar no display a data e o horário atual.
         * O método será chamado antes do setInterval com o
         * objetivo de que o display seja atualizado imediatamente
         * no carregamento da calculadora e não após um segundo.
         */
        this.setDisplayDateTime();

        /**
         * setInterval() - função para executar determinada 
         * função em um intervalo de tempo. recebe dois parâ-
         * metros: uma função (neste caso uma Arrow Function)
         * e o período de tempo em milisegundos.
         */

        setInterval(() => {
            
            // irá atualizar no display a data e o horário atual
            this.setDisplayDateTime();

        }, 1000);

    }

    /**
     * Método para capturar os eventos dos botões
     */
    initButtonsEvents() {

        /**
         * Seleciona todas as li's que estão dentro da div #keyoard
         */
        let buttons = document.querySelectorAll("#keyboard > ul > li");

        /**
         * Criamos um laço forEach (para cada) onde iremos percorrer
         * cada um dos botões do array buttons e adicionar o evento
         * de listener.
         */
        
        buttons.forEach(btn=>{

            /**
             * adicionamos uma escuta de evento na variárvel buttons.
             * O método addEventListener recebe 2 parâmetros, o evento
             * que queremos monitorar, 'click' por exemplo, e que função
             * queremos que seja realizada caso o evento ocorra.
             * 
             * Vamos utilizar uma arrow function. o parâmetro 'e' será utilizado
             * sempre que quisermos fazer referência ao elemento clicado.
             */
            btn.addEventListener('click', e => {

                console.log(btn.className.replace("btn-",""));


            });

        });

    }

    /**
     * irá atualizar no display a data e o horário atual
     */
    setDisplayDateTime() {

        /**
         * this.displayDate faz referência ao método set que irá inserir
         * no elemento html correspondente a data atual.
         * O métoedo this.currentDate retorna uma nova instância da classe
         * Date() que será formatada com o método toLocaleDateString para
         * o 'pt-BR'.
         */
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        /**
         * this.displayTime faz referência ao método set que irá inserir
         * no elemento html correspondente o horário atual.
         * O métoedo this.currentDate retorna uma nova instância da classe
         * Date() que será formatada com o método toLocaleTimeString para
         * o 'pt-BR'.
         */
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    /**
     * getters e setters
     */

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

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate() {

        return new Date();

    }

}