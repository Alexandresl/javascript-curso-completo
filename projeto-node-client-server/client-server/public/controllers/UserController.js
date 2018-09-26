/**
 * Classe UserController
 */
class UserController {

    /**
     * Método construtor
     */
    constructor(formIdCreate, formIdUpdate, tableId) {

        // recebo o formulário de cadastro e armazeno no atributo formEl
        this.formEl = document.getElementById(formIdCreate);
        // recebo o formulário de Update e armazeno no atributo formEl
        this.formUpdateEl = document.getElementById(formIdUpdate);
        // recebo o formulário e armazeno no atributo formEl
        this.tableEl = document.getElementById(tableId);
        // Chamaos o listener do evento submit do formulário
        this.onSubmit();
        // chama os eventos de edição de usuário
        this.onEdit();
        // Método para verificar se a session storage já possui dados
        this.selectAll();

    }

    /**
     * Método para cancelar editar.
     */
    onEdit() {

        /**
         * Listener para o botão cancelar edição que irá apenas
         * substituir o formulário de edição pelo de cadastro.
         */
        document.querySelector("#box-user-update .btn-cancel").addEventListener('click', e => {

            this.showPanelCreate();

        });

        /**
         * Adicionamos o evento de submit para o formulário de
         * update.
         */
        this.formUpdateEl.addEventListener("submit", event => {

            /**
             * utilizamos o método preventDefault() para anular o comportamento padrão
             * do submit do formulário. O argumento event nos retorna um objeto que
             * permite invocarmos o evento.
             */
            event.preventDefault();

            /**
             * Selecionamos o botão submit e desabilitamos ele até que
             * o update tenha sido finalizado ou retornado algum erro
             * de validação
             */
            let btn = this.formUpdateEl.querySelector('[type=submit]');

            btn.disabled = true;

            /**
             * Ao ser disparado o evento de submit do formulário chamamos o método
             * getValues() que irá recuperar os dados do formulário
             */
            let values = this.getValues(this.formUpdateEl);

            /**
             * Recuperamos o index da linha cujo objeto
             * foi editado
             */
            let index = this.formUpdateEl.dataset.trIndex;

            /**
             * pego a tr que eu quero alterar e sobrescrevo
             * o dataset que já está nesta tr pelo que foi
             * recuperado pelo getValues
             */
            let tr = this.tableEl.rows[index];

            /**
             * Mesclar objeto antigo com o novo para
             * não perder imagem caso não tenha sido selecionada.
             * 
             * primeiro coloco o objeto antigo em JSON na variável
             * userOld.
             */
            let userOld = JSON.parse(tr.dataset.user);

            /**
             * resultado da combinação dos dois objetos
             */
            let result = Object.assign({}, userOld, values);

            /**
             * Chamamos o método que conseguirá ler a photo recebida.
             */
            this.getPhoto(this.formUpdateEl).then(
                /**
                 * função que será executada quando der certo.
                 * o content é o que é retornado do método
                 * resolve.
                 */
                (content) => {

                    /**
                     * validação para caso venha a foto vazia
                     * mantermos a mesma foto (if) ou para 
                     * substituírmos pela nova foto (else).
                     */
                    if (!values.photo) {
                        
                        result._photo = userOld._photo;
                    
                    } else {

                        result._photo = content;

                    }

                    let user = new User();

                    user.loadFromJSON(result);

                    /**
                     * salvamos as alterações no local
                     * storage
                     */
                    user.save().then(user => {

                        /**
                         * retorna uma tr com os dados do
                         * usuário
                         */
                        tr = this.getTr(user, tr);

                        /**
                         * Atualizamos contator de usuários e
                         * administradores.
                         */
                        this.updateCount();

                        /**
                         * Limpa o formulário
                         */
                        this.formUpdateEl.reset();

                        /**
                         * limpar formulário e limpar btn.
                         */
                        btn.disabled = false;


                        /**
                         * Mostramos novamente formulário de cadastro.
                         */
                        this.showPanelCreate();

                    });

                },
                /**
                 * função que será executada quando der errado.
                 * o e é o que é retornado do método reject
                 */
                (e) => {

                    console.error(e);

                }

            );

        });

    }

    /**
     * Adiciona um listener para o evento de submit do formulário
     */
    onSubmit() {

        /**
         * Adicionamos um listener no evento de submit do formulário.
         */
        this.formEl.addEventListener("submit", event => {

            /**
             * utilizamos o método preventDefault() para anular o comportamento padrão
             * do submit do formulário. O argumento event nos retorna um objeto que
             * permite invocarmos o evento.
             */
            event.preventDefault();

            /**
             * Selecionamos o botão submit e desabilitamos ele até que
             * o cadastro tenha sido finalizado ou retornado algum erro
             * de validação
             */
            let btn = this.formEl.querySelector('[type=submit]');

            btn.disabled = true;

            /**
             * Ao ser disparado o evento de submit do formulário chamamos o método
             * getValues() que irá recuperar os dados do formulário
             */
            let values = this.getValues(this.formEl);

            /**
             * Ativa novamente o botão submit
             */
            btn.disabled = false;

            /**
             * verificamos se a variável values é um boolean false
             * e neste caso saimos também desta função sem tentarmos
             * definir a photo. Assim o values não será um objeto como
             * esperádo e sim pegará o valor do return false resultado
             * do getValues();
             */
            if (!values) return false;

            /**
             * Chamamos o método que conseguirá ler a photo recebida.
             */
            this.getPhoto(this.formEl).then(
                /**
                 * função que será executada quando der certo.
                 * o content é o que é retornado do método
                 * resolve.
                 */
                (content) => {

                    /**
                     * Sobrescrevemos o atributo photo com o retorno
                     * do método getPhoto();
                     */
                    values.photo = content;

                    /**
                     * Método para salvar no session storage
                     */
                    values.save().then(user => {

                        /**
                         * Chama a função para adicionar uma linha na tabela
                         * já com o conteúdo do atributo photo editado.
                         */
                        this.addLine(user);

                        /**
                         * Limpa o formulário
                         */
                        this.formEl.reset();

                    });

                },
                /**
                 * função que será executada quando der errado.
                 * o e é o que é retornado do método reject
                 */
                (e) => {

                    console.error(e);

                }

            );

        });

    }

    /**
     * Método para "ler" o conteúdo da foto.
     */
    getPhoto(formEl) {

        /**
         * iremos retornar uma promise que possui
         * dois argumentos: o resolve (para quando 
         * a ação onter sucesso) e o reject (para 
         * quando tivermos algum erro).
         */
        return new Promise((resolve, reject) => {

            /**
             * Criamos uma instância do objeto FileReader.
             */
            let fileReader = new FileReader();

            /**
             * Percorremos os elementos do formulário.
             * O método filter() cria um novo array com 
             * todos os elementos que passaram no teste 
             * implementado pela função fornecida.
             * 
             * criamos um novo array elements com os 
             * elementos filtrados, embora neste caso
             * sempre iremos ter um array de apenas um
             * elemento.
             */
            let elements = [...formEl.elements].filter(item => {

                /**
                 * Retorna apenas se o item tiver
                 * o name = photo
                 */
                if (item.name === 'photo') {

                    return item;

                }

            });

            /**
             * Criamos uma variável com a imagem selecionada
             * para que possamos encaminhar para o fileReader
             */
            let file = elements[0].files[0];


            /**
             * Chamamos o método onLoad - Um manipulador para 
             * o evento load. Este evento é chamado cada vez 
             * que a operação de leitura é completada com sucesso.
             */
            fileReader.onload = () => {

                /**
                 * Chamamos a função resolve que é parâmetro da
                 * nossa promise.
                 * 
                 * fileReader.result() - O conteúdo do arquivo. 
                 * Esta propriedade é válida apenas após a operação 
                 * de leitura estar completa, e o formato dos dados 
                 * dependem de qual método foi usado para iniciar a 
                 * operação de leitura.
                 */
                resolve(fileReader.result);

            };

            /**
             * função do fileReader para quando a leitura retornar
             * algum erro.
             */
            fileReader.onerror = (e) => {

                /**
                 * reject - parâmetro da promisse
                 * para quando ocorrer algum erro.
                 */
                reject(e);

            }

            /**
             * if que irá verificar se foi selecionada alguma
             * imagem, pois caso contrário será selecionada
             * uma imagem padrão.
             */
            if (file) {

                /**
                 * Inicia a leitura do conteúdo do Blob especificado, 
                 * uma vez finalizado, o atributo result conterá um data: 
                 * URL representando os dados do arquivo.
                 * 
                 * Passamos o arquivo selecionado para o método
                 * readAsDataURL().
                 */
                fileReader.readAsDataURL(file);

            } else {

                resolve('dist/img/boxed-bg.jpg');

            }

        });

    }

    /**
     * Método para pegar os valores do formulário.
     * recebemos o formulário como parâmetro para
     * podermos utilizar o método para o cadastro
     * e o update, por exemplo
     */
    getValues(formEl) {

        /**
         * Criamos um ojeto chamado user que irá ser
         * utilizado ao percorrermos os elementos do
         * formulário com o forEach();
         */
        let user = {};

        /**
         * Variável que avalia estado do formulário (válido ou não válido)
         */
        let isValid = true;

        /**
         * Percorremos o array de elementos utilizando o método forEach
         * (para cada) que vai nos retornar no argumento field o elemento
         * em questão. Caso eu queira posso adicionar um segundo argumento
         * index para retornar a ordem deste elemento iniciando em zero (0);
         */
        [...formEl.elements].forEach((field) => {

            /**
             * if para validação do formulário para não permitir
             * o envio de campos em branco. percorremos o array
             * para verificar se o field.name está entre os
             * campos que eu quero validar, que são os que estão
             * no array.
             */
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');

                isValid = false;

            }

            /**
             * percorro novamente os campos para caso o usuário já
             * tenha preenchido os campos, retirar a classe que
             * mostra o erro.
             */
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && field.value) {

                field.parentElement.classList.remove('has-error');

            }

            /**
             * Criamos uma condição para identificar quando o elemento 
             * possuir o name gender.
             */
            if (field.name === "gender") {

                /**
                 * Tendo selecionado os elementos que possuem o name =
                 * "gender", separamos apenas o que está checked.
                 */
                if (field.checked) {

                    /**
                     * Para montar o objeto no padrão {chave: valor}
                     * utilizo o field.name para chave e o field.value
                     * para o valor.
                     */
                    user[field.name] = field.value;

                }

                /**
                 * Criamos em else if para tratar o retorno do admin
                 * assim caso o campo admin esteja checked retorna 
                 * true ou do contrário false. Situação que depois
                 * será tratada na view para aparecer sim ou não.
                 */
            } else if (field.name === "admin") {

                user[field.name] = field.checked;

            } else {

                /**
                 * Neste else retorna todos os demais elementos que não
                 * possue o name = 'gender'.
                 * 
                 * Para montar o objeto no padrão {chave: valor}
                 * utilizo o field.name para chave e o field.value
                 * para o valor.
                 */
                user[field.name] = field.value;

            }

        });

        /**
         * Antes de retornar verificamos se formulário está válido.
         * caso contrário retornamos false.
         */
        if (!isValid) {

            return false;

        }

        /**
         * Criamos uma instância da classe User.
         */
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    }

    /**
     * Método para listar todos os dados que
     * já estão no session storage / local storage
     */
    selectAll() {

        /**
         * Chamamos o método que retorna um array
         * dos dados já armazenados no session
         * storage.
         */
        //let users = User.getUsersStorage();

        /**
         * Será criado o ajax
         */

        User.getUsersStorage().then(data => {

            /**
             * percorre o array de usuários
             */
            data.users.forEach(dataUser => {

                /**
                 * instânciamos um novo objeto da classe
                 * User
                 */
                let user = new User();

                /**
                 * Convertemos os dados recebidos como
                 * JSON para o novo objeto
                 */
                user.loadFromJSON(dataUser);

                /**
                 * Inserimos o usuário na nossa
                 * tabela
                 */
                this.addLine(user);

            });

        });

    }

    /**
     * Método que irá adicionar uma linha com os dados do usuário.
     */
    addLine(dataUser) {

        /**
         * Método getTr() irá me retornar uma tr
         * que eu vou armazenar na variavel tr
         * e depois adicionar no elemento
         * tableEl.
         */
        let tr = this.getTr(dataUser);


        /**
         * Adiciono a tr no tbody da tabela que possui o #table-users.
         */
        this.tableEl.appendChild(tr);

        /**
         * Atualizamos contator de usuários e
         * administradores.
         */
        this.updateCount();

    }

    /**
     * Pega a tr e adiciona os dados vindo de um objeto
     */
    getTr(dataUser, tr = null) {

        /**
         * Crio um elemento tr e armazeno em uma variável
         * chamada tr.
         */
        if (tr === null) tr = document.createElement("tr");

        /**
         * colocamos os dados do usuário em um dataset
         * para conseguirmos contar o número de admin
         * no método updateCount();
         */
        tr.dataset.user = JSON.stringify(dataUser);

        /**
         * Adiciono na variável tr o conteúdo html das
         * colunas
         */
        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? "Sim" : "Não"}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;

        /**
         * Adiciono o evento para o botão editar e excluir
         */
        this.addEventsTr(tr);

        return tr;

    }

    /**
     * Método que adicionará o evento para o botão editar
     */
    addEventsTr(tr) {

        /**
         * Selecionamos o botão de excluir da linha que acabamos de inserir e
         * adicionamos um listener para o evento de click.
         * recebemos o parâmetro e para podermos invocar este evento.
         */
        tr.querySelector(".btn-delete").addEventListener('click', e => {

            /**
             * Pedimos a confirmação da exclusão
             */
            if (confirm("Deseja realmente excluir?")) {

                /**
                 * Instanciamos um usuário e pegamos seus
                 * dados do dataset da tr.
                 */
                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user));

                user.remove().then(data => {

                    // Removemos a linha da tabela
                    tr.remove();

                    // Atualizamos as estatísticas
                    this.updateCount();

                });

            }

        });
        

        /**
         * Selecionamos o botão editar da linha que acabamos de inserir e
         * adicionamos um listener para o evento de click.
         * recebemos o parâmetro e para podermos invocar este evento.
         */
        tr.querySelector(".btn-edit").addEventListener('click', e => {

            /**
             * utilizamos o JSON.parse() para recuperar os dados do usuário
             * incluídos na propriedade dataset.
             */
            let json = JSON.parse(tr.dataset.user);

            /**
             * iremos guardar no dataset do formulário o index da linha
             * que foi clicado para edição para podermos editar o objeto
             * correto e depois inserir este novo objeto na linha correta.
             */
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            /**
             * Criamos um forIn para percorrer todos os dados pegando o nome
             * da propriedade no json.
             */
            for (let name in json) {

                /**
                 * No formulário de update procuramos o campo cujo nome
                 * vai ser igual a propriedade do json sem o underline.
                 * 
                 * tendo encontrado o campo armazenamos em uma variável
                 * field
                 */
                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");

                /**
                 * Como nem todas as propriedades do objeto possuem campo
                 * (register por exemplo) antes de atribuírmos o valor devemos
                 * verificar se o campo existe para não estourar um erro.
                 */
                if (field) {

                    /**
                     * Criamos um switch para ajustar o comportamento
                     * para os diferentes tipos de campos: text, checkbox
                     * radio, etc...
                     */
                    switch (field.type) {

                        /**
                         * se for file apenas continuamos.
                         */
                        case 'file':
                            continue;

                        /**
                         * No caso do radio teremos que verificar qual dos
                         * dois teremos que marcar como checked. Para isso
                         * fazemos uma nova query e procuramos o campo
                         * que tiver o mesmo value (M ou F).
                         * Quando identificamos incluimos ao campo a propriedade
                         * checked.
                         */
                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;

                        /**
                         * Para o checkbox
                         */
                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        /**
                         * default
                         */
                        default:
                            // Agora no campo field adicionamos o valor correspondente ao campo.
                            field.value = json[name];
                            break;

                    }

                }

            }

            /**
             * carregar a photo cadastrada
             */
            this.formUpdateEl.querySelector(".photo").src = json._photo;

            /**
             * Escondemos o formulário de cadastro e mostramos o formulário
             * de edição.
             */
            this.showPanelUpdate();

        });

    }

    /**
     * Método para mostrar formulário de cadastro
     */
    showPanelCreate() {

        /**
         * Escondemos o formulário de update e mostramos o formulário
         * de cadastro.
         */
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    /**
     * Método para mostrar formulário de edição
     */
    showPanelUpdate() {

        /**
         * Escondemos o formulário de cadastro e mostramos o formulário
         * de edição.
         */
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";

    }

    /**
     * Método para atualizar número de usuários 
     * e administradores
     */
    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        /**
         * pegamos a coleção de elementos que são
         * filhos do tbody, que é cada uma das linhas
         * que eu preciso percorrer. Por não ser um
         * array e sim uma coleção de elementos, vamos
         * utilizar o spred (...) para percorrer com o
         * forEach();
         */
        [...this.tableEl.children].forEach(tr => {

            /**
             * incrementa o número de usuários
             */
            numberUsers++;

            /**
             * recupera os dados do usuário através do
             * dataset
             */
            let user = JSON.parse(tr.dataset.user);

            /**
             * se o admin for true eu incremento o 
             * contador de administradores
             */
            if (user._admin) {

                numberAdmin++;

            }

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }

}