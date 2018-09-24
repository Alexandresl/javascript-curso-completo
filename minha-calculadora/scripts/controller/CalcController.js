class CalcController {

    /**
     * método construtor.
     * Irá conter os atributos da classe CalcController.
     */
    constructor() {
        // atributo que controla o audio
        this._audioOnOff = false;
        // atributo com audio
        this._audio = new Audio("click.mp3");
        // mostra o icone do audio
        this._iconAudio = false;
        // irá armazenar o último operador
        this._lastOperator = '';
        // irá armazenar o último número
        this._lastNumber = '';
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
        // Inicializa a escuta para os eventos de teclado
        this.initKeyboard();

    }

    /**
     * insere no display o número que esteja na memória
     */
    pasteFromClipboard() {

        // adiciono um listener de cópia no meu documento
        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text)            

        });

    }

    copyToClipboard() {

        // cria um input
        let input = document.createElement('input');
        // adiciona o valor do display no input
        input.value = this.displayCalc;
        // inclui o input dentro do body
        document.body.appendChild(input);
        // faz a seleção do conteúdo
        input.select();
        // executa o comendo de copiar
        document.execCommand("Copy");
        // remove o input do DOM
        input.remove();

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

        // atualiza a tela.
        this.setLastNumberToDisplay();

        // adiciona a escuta para cola
        this.pasteFromClipboard();

        // Adicionamos o evento de duplo clique no botão
        document.querySelector('.btn-c').addEventListener('dblclick', e => {

            this.toggleAudio();
            // mostrar e esconder icone de audio
            this.showIconAudio();

        });

    }

    // liga / desliga audio da calculadora
    toggleAudio() {

        this._audioOnOff = !this._audioOnOff;
        this._iconAudio = !this._iconAudio;

    }

    // Método para tocar o audio
    playAudio() {

        // verifica se o audio está ligado ou não
        if (this._audioOnOff) {

            /**
             * Estabelece que sempre vai tocar do
             * início, o que elimina as falhas ao
             * se digitar rápido.
             */
            this._audio.currentTime = 0;

            // Toca o audio
            this._audio.play();

        }
    }

    /**
     * Mostra e esconde icone de audio
     */
    showIconAudio() {

        if (this._iconAudio) {
            document.querySelector(".display-audio").style.visibility = "visible";
        } else {
            document.querySelector(".display-audio").style.visibility = "hidden";
        }

    }

    /**
     * Método para inicializar os eventos de teclado da
     * calculadora.
     */
    initKeyboard() {

        /**
         * Adiciona a escuta no teclado.
         */
        document.addEventListener('keyup', e => {

            // ativa / desativa som
            this.playAudio();

            switch (e.key) {

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
                    this.addOperation(parseInt(e.key));
                    break;

                case 'Escape':
                    this.clearAll();
                    break;

                case 'Backspace':
                    this.cancelEntry();
                    break;

                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;

                case '.':
                case ',':
                    this.addDot();
                    break;

                case '=':
                case 'Enter':
                    this.calc();
                    break;
                
                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
                    break;

            }            

        });

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
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();

    }

    /**
     * irá cancelar a última entrada quando acionado o botão
     * 'CE'
     */
    cancelEntry() {

        this._operation.pop();
        this.setLastNumberToDisplay();

    }

    /**
     * Método que irá retornar a última posição
     * do array _operation.
     */
    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    /**
     * método que irá substituir a última posição do 
     * meu array pelo parâmetro recebido.
     */
    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    /**
     * Verifica se o valor recebido é um operador
     */
    isOperator(value) {

        /**
         * O indexOf irá percorrer o array procurando
         * se o parâmetro recebido existe no array.
         * Caso ele encontre ele retorna o index do
         * elemento e caso não encontre retorna -1.
         * 
         * Assim criamos um if para ver se o resultado
         * do indexOf é maior que -1. Se sim retornamos
         * true se não retornamos false.
         */
        if (['+', '-', '*', '/', '%'].indexOf(value) > -1) {

            return true;

        } else {

            return false;

        }

    }

    /**
     * Método irá verificar se já existem 3 elementos no meu array
     * caso em que antes de realizar o push irá calcular o valor.
     */
    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

    }
    // retorna o resultado da operação
    getResult() {

        /**
         * usamos o try catch para tentar realizar
         * o cálculo
         */
        try {

            /**
             * método retorna o resultado da operação que temos
             * no array _operation[];
             * 
             * o Método eval() calcula quando a operação aparece
             * como string
             * o Método join() une elementos de um array utilizando
             * o separador passado como parâmetro. No caso de utilizarmos
             * o '' ele une sem utilizar nenhum operador.
             */
            return eval(this._operation.join(""));

        } catch (e) {

            setTimeout(() => {
                
                this.setError();

            }, 1);           

        }



    }

    /**
     * Método para calcular
     */
    calc() {

        /**
         * crio uma variável que poderá armazenar o
         * último operador digitado
         */
        let last = '';

        /**
         * armazena o último operador digitado
         */
        this._lastOperator = this.getLastItem();

        /**
         * Verifica se eu estou precionando o igual
         * antes de ter 3 itens.
         */

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        /**
         * verifica se eu tenho mais de 3 posições
         * no array para aí armazenar este útltimo
         * em uma variável
         */
        if (this._operation.length > 3) {

            /**
             * retiramos a última posição do array e
             * armazenamos na variável last.
             */
            last = this._operation.pop();

            /**
             * Armazena no atributo _lastNumber o resultado
             * da operação contida no array.
             */
            this._lastNumber = this.getResult();

        /**
         * condição que quando tivermos exatamente 3
         * itens e clicarmos no igual.
         */
        } else if (this._operation.length == 3) {

            /**
             * Armazena no atributo _lastNumber o resultado
             * da operação contida no array.
             */
            this._lastNumber = this.getLastItem(false);
            
        }        

        /**
         * Armazena na variável result o resultado
         * da operação contida no array.
         */
        let result = this.getResult();

        /**
         * verifica se o último operador digitado foi o sinal
         * do porcento.
         */
        if (last === '%') {

            /**
             * multiplicamos a primeira posição do array com a terceira
             * e dividimos por 100 e armazena os em uma variável 'porcento'.
             */
            let porcento = this._operation[0] * this._operation[2] / 100

            /**
             * colocamos o resulado do porcento na penúltima posição
             * do nosso array.
             */
            this._operation[this._operation.length - 1] = porcento

        } else {

            /**
             * Criamos um novo array com o resultado da operção
             * e o último operador que foi digitado.
             */
            this._operation = [result];

            if (last) this._operation.push(last);

        }

        // atualiza o display
        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true) {

        /**
         * criamos uma variável chamada lastNumber que irá
         * armazenar o último número digitado no meu array.
         */
        let lastItem;

        /**
         * Percorro o array da última posição para a primeira
         * até enconrar o último número digitado.
         */
        for (let i = this._operation.length - 1; i >= 0; i--) {

                /**
                 * Condição que verifica se a posição que estamos
                 * percorrendo é um operador ou um número dependendo
                 * do parâmetro (isOperator) recebido na função true 
                 * ou false.
                 */
                if (this.isOperator(this._operation[i]) == isOperator) {

                    /**
                     * caso seja um número, armazenamos na variável
                     * lastNumber e utilizamos o break para pararmos
                     * de percorrer o array
                     */
                    lastItem = this._operation[i];
                    break;
                }

        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        /**
         * retorno o último item que eu estou procurando
         */
        return lastItem;

    }

    /**
     * Método para atualizar o display da calculadora
     */
    setLastNumberToDisplay() {

        // retorna o último número do array
        let lastNumber = this.getLastItem(false);

        /**
         * verificamos se o lastNumber é vazio e adiciona o zero.
         */
        if (!lastNumber) lastNumber = 0;

        /**
         * colocamos o último número encontrado no display da calculadora
         */
        this.displayCalc = lastNumber;

    }

    /**
     * @param {*} value = última entrada que deverá ser tratada
     * poderá ser um número ou uma operação.
     * 
     * Método que irá receber a última entrada do usuário e
     * tratá-la conforme o caso.
     */
    addOperation(value) {

        /**
         * if que testa se a última entrada do meu array
         * é um número.
         */
        if (isNaN(this.getLastOperation())) {

            // Não é um número

            if (this.isOperator(value)) {

                // Trocar o operador
                // método substitui a última posição do array pelo parâmetro recebido.
                this.setLastOperation(value);

            } else {

                /**
                 * Este else significa que o array _operation
                 * está vazio e que o meu value é um número. Assim
                 * vou apenas dar um push deste valor no meu array.
                 */
                this.pushOperation(value);

                // atualiza display
                this.setLastNumberToDisplay();

            }

        } else {

            // É um número

            /**
             * Verifica se a última entrada não é um número, caso que irá
             * fazer um push do operador.
             */
            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                /**
                 * transforma em string a última posição do array que é um número e
                 * concatena com o valor recebido que também será convertido
                 * para uma string.
                 */
                let newValue = this.getLastOperation().toString() + value.toString();

                // método substitui a última posição do array pelo parâmetro recebido.
                this.setLastOperation(newValue);

                // atualizar display
                this.setLastNumberToDisplay();

            }

        }

    }

    /**
     * Método utilizado para operações ou entradas de usuário
     * inválidas.
     */
    setError() {

        this.displayCalc = "error";

    }

    /**
     * Método para tratar quando um ponto for adicionado.
     */
    addDot() {
        
        /**
         * Verificaos qual é a última entrada na calculadora.
         */
        let lastOperation = this.getLastOperation();

        // Condição para impedir que consigamos adicionar mais de um ponto no mesmo número.
        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        /**
         * Se a última entrada for um operador ou for undifined
         * vamos acrescentar uma string de '0.'. Caso contrário
         * será um número que vamos transformar em string para
         * concatenar com o ponto.
         */
        if (this.isOperator(lastOperation) || !lastOperation) {

            this.pushOperation('0.');

        } else {

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();        

    }

    /**
     * @param value = "nome" do botão que foi clicado
     * 
     * irá pegar o "nome" do botão que sofreu determinado evento
     * e através do switch determinar uma ação para quando este
     * evento ocorrer.
     */
    execBtn(value) {

        // ativa / desativa som
        this.playAudio();

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
                this.addOperation('%');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'ponto':
                this.addDot();
                break;

            case 'igual':
                this.calc();
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

        buttons.forEach(btn => {

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
                let textBtn = btn.className.replace("btn-", "");

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

    /* 
    set displayCalc(value) {

        if (value.toString().length > 15) {

            this.setError();

            return false;

        }

        this._displayCalcEl.innerHTML = value;

    } */

    set displayCalc(value) {

        //Identificando se o valor(value) tem mais de 10 caracteres
        if (value.toString().length > 10) {
            //identificando se o valor (value) é um numero inteiro
            if (Number.isInteger(value)) {
                //tornando o valor (value) um exponencial e limitando a visualição em 5 caracteres após a virgula
                //EX: 123456 *123456
                return this._displayCalcEl.innerHTML = value.toExponential(5);

            } else {
                //retornando o valor (value) com caracteres limitados em 10;
                //EX: 10/3
                return this._displayCalcEl.innerHTML = value.toString().substring(0, 10);
            }
        }
        //fazendo a impressão do valor(value) na tela caso ele seja menor que 10 carracteres

        return this._displayCalcEl.innerHTML = value.toString();
    }

    get currentDate() {

        return new Date();

    }

}