class CalcController {

    /**
     * método construtor.
     * Irá conter os atributos da classe CalcController.
     */
    constructor() {
        // atribuo que irá armazenar os últimos itens da minha operação
        this._operation = [];
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
     * Método criado para adicionar mais de um tipo de evento
     * para um mesmo elemento sem a necessidade de duplicar 
     * o código.
     * receberemos como parâmetros: o elemento que eu quero
     * adicionar a escuta, a lista de eventos que eu quero monitorar
     * e a função que eu quero que seja executada.
     */
    addEventListenerAll(element, events, fn) {

        /**
         * O método split irá pegar uma string e transformá-la em um
         * array. Este array terá cada elemento criado pelo separador
         * utilizado como parâmetro, neste caso o espaço.
         * Em seguida iremos fazer o forEach, percorrendo cada um dos
         * itens listados como evento.
         * 
         * Assim poderemos posteriormente utilizando o método nativo
         * addEventListener() adicionar vários tipos de eventos em 
         * um mesmo elemento que irá executar uma mesma função.
         */
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }

    /**
     * Método que irá apagar todo o histórico de operação da
     * calculadora. Utilizado para o botão 'C'.
     */
    clearAll() {

        this._operation = [];

    }

    /**
     * irá cancelar a última entrada quando acionado o botão
     * 'CE'
     */
    cancelEntry() {

        this._operation.pop();

    }

    addOperation(value) {

        this._operation.push(value);

        console.log(this._operation);
        

    }

    /**
     * Método utilizado para operações ou entradas de usuário
     * inválidas.
     */
    setError() {

        this.displayCalc = "error";

    }

    /**
     * @param value = "nome" do botão que foi clicado
     * 
     * irá pegar o "nome" do botão que sofreu determinado evento
     * e através do switch determinar uma ação para quando este
     * evento ocorrer.
     */
    execBtn(value) {

        switch (value) {

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

            case 'c':
                this.clearAll();
                break;
        
            case 'ce':
                this.cancelEntry();
                break;
        
            case 'porcento':
                
                break;
        
            case 'divisao':
                
                break;
        
            case 'multiplicacao':
                
                break;
        
            case 'subtracao':
                
                break;
        
            case 'soma':
                
                break;
        
            case 'ponto':
                
                break;
        
            case 'igual':
                
                break;
        
            default:
                this.setError();
                break;
        }

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
             * O método addEventListenerAll será criado pois o método
             * nativo addEventListener só recebe um evento por vez.
             * Nosso método irá receber 3 parâmetros: o elemento que eu
             * quero adicionar a escuta, os eventos que queremos monitorar, 
             * 'click drag' por exemplo, e que função
             * queremos que seja realizada caso o evento ocorra.
             * 
             * Vamos utilizar uma arrow function. o parâmetro 'e' será utilizado
             * sempre que quisermos fazer referência ao elemento clicado.
             */
            this.addEventListenerAll(btn, 'click drag', e => {

                /**
                 * recebo na variável textBtn uma string que
                 * identifica o meu botão.
                 */
                let textBtn = btn.className.replace("btn-","");                

                /**
                 * Chama um método que irá através do switch
                 * identificar o botão, que foi passado por parâmetro
                 * e executar uma função de acordo com cada botão
                 */
                this.execBtn(textBtn);

            });

            /**
             * Utilizaremos o método criado para adicionar o 
             * cursor pointer em todos os botões deixando nossa
             * aplicação mais intuitiva.
             */
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

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