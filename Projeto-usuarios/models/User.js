/**
 * Classe User
 */
class User {

    /**
     * Método construtor
     */
    constructor(name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    /**
     * Métodos getters and setters
     */
    set id(value) {

        this._id = value;

    }

    get id() {

        return this._id;

     }

    set name(value) {

        this._name = value;

    }

    get name() {

        return this._name;

    }

    set gender(value) {

        this._gender = value;

    }

    get gender() {

        return this._gender;

    }

    set birth(value) {

        this._birth = value;

    }

    get birth() {

        return this._birth;

    }

    set country(value) {

        this._country = value;

    }

    get country() {

        return this._country;

    }

    set email(value) {

        this._email = value;

    }

    get email() {

        return this._email;

    }

    set password(value) {

        this._password = value;

    }

    get password() {

        return this._password;

    }

    set photo(value) {

        this._photo = value;

    }

    get photo() {

        return this._photo;

    }

    set admin(value) {

        this._admin = value;

    }

    get admin() {

        return this._admin;

    }

    get register() {

        return this._register;

    }

    /**
     * Método que recebe um JSON
     * e carrega as informações
     * nos atributos do objeto
     */
    loadFromJSON(json) {

        /**
         * for in para percorrer todos
         * as chaves do json
         */
        for (let name in json) {

            /**
             * Tratamos para o caso de
             * ser uma data.
             */
            switch(name) {

                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];
                    break;
            }

        }

    }

    /**
     * Pega os dados do session storage
     * / local storage
     */
    static getUsersStorage() {

        /**
         * Criamos um array de usuários
         */
        let users = [];

        /**
         * Verifico se no session storage já
         * existe usuários com a chave users.
         * caso tenha eu primeiro adiciono os
         * dados que eu já possuo no meu array
         * criado.
         */
        //if (sessionStorage.getItem("users")) {

        //    users = JSON.parse(sessionStorage.getItem("users"));

        //}

        /**
         * Verifico se no local storage já
         * existe usuários com a chave users.
         * caso tenha eu primeiro adiciono os
         * dados que eu já possuo no meu array
         * criado.
         */
        if (localStorage.getItem("users")) {

            users = JSON.parse(localStorage.getItem("users"));

        }

        /**
         * Retornamos o array de usuários
         */
        return users;

    }

    /**
     * Método que irá retornar um novo ID para
     * o usuário.
     */
    getNewId() {

        /**
         * Como a informação do id terá que ser global
         * para a aplicação, todos os usuários, por exemplo
         * precisarão acessar. o controle do ID terá que final
         * também no contexto do local storage.
         * 
         * Verificamos qual é o último id no local storage e
         * guardamos como número (utilizamos o parseInt()) 
         * já que ele vem como string.
         */
        let usersId = parseInt(localStorage.getItem("usersId"));

        if (!usersId > 0) usersId = 0;

        usersId++;

        localStorage.setItem("usersId", usersId);

        return usersId;

    }

    /**
     * Método para salvar o usuário no Local Storage
     */
    save() {

        /**
         * Chamamos o método que retorna um array
         * dos dados já armazenados no session
         * storage.
         */
        let users = User.getUsersStorage();

        /**
         * Adicionamos uma chave antes de guardar
         * no local storage.
         * 
         * Verificaos se o id é maior que zero, ou
         * seja, se o usuário já possui id.
         */
        if (this.id > 0) {

            /**
             * Utilizamos o array.map para encontrar a posição
             * que eu desejo alterar e já realizar a alteração
             */
            users.map(u => {

                /**
                 * Caso ele encontre o id correspondente substitui
                 * a possição do meu array pelo this.
                 */
                if (u._id == this.id) {

                    /**
                     * Vamos mesclar os dois objetos com o
                     * Object.assing()
                     */
                    Object.assign(u, this);

                }

                return u;

            });

        } else {

            /**
             * Caso ele não possua id, vai cair no else.
             * Neste caso teremos que gerar um novo ID para
             * este usuário.
             */
            this.id = this.getNewId();

            /**
             * Adiciono no array o usuário (this) que estou
             * recebendo como parâmetro
             */
            users.push(this);
            
        }

        /**
         * Volto a converter e armazenar com os dados adicionados
         * na session Storage.
         */
        localStorage.setItem("users", JSON.stringify(users));
        
    }

    /**
     * Irá remover o objeto do local storage
     */
    remove() {

        /**
         * Seleciono todos os dados salvos no local
         * storage e coloco no array users.
         */
        let users = User.getUsersStorage();

        /**
         * Percorro o array de usuários com o forEach()
         * para procurar o registro com o mesmo ID que
         * o meu objeto. Pego como retorno os dados do
         * usuário e o index para saber a posição que
         * estes dados estão.
         */
        users.forEach((userData, index) => {

            if (this.id == userData._id) {

                /**
                 * Para removermos um item do array
                 * pelo index basta pegarmos o próprio
                 * array e usar o método splice() passando
                 * o index e a quantidade de itens que desejamos
                 * remover.
                 */
                users.splice(index, 1);

            }

        });

        /**
         * Após retirarmos o item do nosso array,
         * basta colocá-lo novamente no local
         * storage
         */
        localStorage.setItem("users", JSON.stringify(users));

    }


}