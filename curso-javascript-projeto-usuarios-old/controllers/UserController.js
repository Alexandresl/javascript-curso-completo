class UserController {

    /**
     * Método construtor
     */
    constructor(formIdCreate, formIdUpdate, tableId) {

        // atributo que pega o formulário
        this.formEl = document.getElementById(formIdCreate);
        // atributo que pega o formulário
        this.formUpdateEl = document.getElementById(formIdUpdate);
        // atributo que pega a tabela (tbody).
        this.tableEl = document.getElementById(tableId);
        // cria o listener para o evento de submit
        this.onSubmit();
        // cria o listener para cancelar a edição de usuário
        this.onEdit();

    }

    /**
     * Método para cancelar edição de usuário
     */
    onEdit() {

        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();

        });

        this.formUpdateEl.addEventListener("submit", event => {

            /**
             * previno que o submit envie o formulário
             */
            event.preventDefault();

            // seleciona o botão submit
            let btn = this.formUpdateEl.querySelector("[type=submit]");

            //desativa o botão submit
            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);

            if (!values.photo) result._photo = userOld._photo;
            
            tr.dataset.user = JSON.stringify(result);
            
            /**
             * selecionamos o tr criado e incluímos as colunas
             */
            tr.innerHTML = `
                <td><img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${result._name}</td>
                <td>${result._email}</td>
                <td>${(result._admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(result._register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            `;
            
        });

        /**
         * Atualiza a tr
         */
        this.addEventsTr(tr);

        /**
         * Atualiza as estatísticas
         */
        this.updateCount();

        btn.disabled = false;

        this.formUpdateEl.reset();

        this.showPanelCreate();

    }

    /**
     * Método submit para envio de formulário
     */
    onSubmit() {

        /**
         * adiciono um listener ao formulário do tipo submit.
         */
        this.formEl.addEventListener("submit", event => {

            /**
             * previno que o submit envie o formulário
             */
            event.preventDefault();

            // seleciona o botão submit
            let btn = this.formEl.querySelector("[type=submit]");

            //desativa o botão submit
            btn.disabled = true;

            let values = this.getValues(this.formEl);

            /**
             * Caso o retorno do método getValues() seja falso
             * paramos a função para que a foto não tente ser
             * tratada.
             */
            if (!values) {

                btn.disabled = false;
                
                return false;
                
            }

            // Promise
            this.getPhoto().then(
                (content) => {

                    values.photo = content;

                    /**
                     * Pegamos os dados do Usuario e chamamos o 
                     * método que irá adicionar na tabela.
                     */
                    this.addLine(values);

                    /**
                     * Limpa o formulário antes de ativar o 
                     * botão
                     */
                    this.formEl.reset();

                    /**
                     * Ativa novamente o botão
                     */
                    btn.disabled = false;

                },
                (e) => {

                    console.error(e);

                }
            );

        });

    }

    /**
     * Método para identificar o caminho da photo
     */
    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item => {

                if (item.name === 'photo') {

                    return item

                }

            });

            let file = elements[0].files[0];


            fileReader.onload = () => {

                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {

                reject(e);

            };

            // Verifica se foi enviada alguma imagem
            if (file) {
                // lê o arquivo
                fileReader.readAsDataURL(file);

            } else {
                // função disparada caso não seja enviada img.
                resolve('dist/img/boxed-bg.jpg');

            }

        });

    }

    /**
     * Método que pega os valores do formulário
     */
    getValues(formEl) {

        let user = {};

        // verifica se o formulário está válido
        let isValid = true;

        /**
         * Pego todos os elementos do formulário e faço um forEach (para cada)
         * percorrendo cada elemento
         */
        [...formEl.elements].forEach((field) => {

            /**
             * Verifica se os campos obrigatórios foram preenchidos
             */
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');

                isValid = false;

            }

            /**
             * if que valida o campo gender para que eu inclua no meu objeto
             * apenas o elemento selecionado
             */
            if (field.name == "gender") {

                if (field.checked) {

                    user[field.name] = field.value;

                }

            } else if (field.name === "admin") {

                user[field.name] = field.checked;

            } else {

                /**
                 * incluo os demais campos ao objeto
                 */
                user[field.name] = field.value;

            }

        });

        if (!isValid) {

            return false;

        }

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
     * Método que irá adicionar uma linha com o usuário criado.
     */
    addLine(dataUser) {

        /**
         * Criamos uma tag tr e armazenamos na variável let
         */
        let tr = document.createElement('tr');

        /**
         * Criamos um data-set para guardarmos os dados do 
         * usuário
         */
        tr.dataset.user = JSON.stringify(dataUser);

        /**
         * selecionamos o tr criado e incluímos as colunas
         */
        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;

        this.addEventsTr(tr);

        /**
         * Adicionamos a tr na tabela
         */
        this.tableEl.appendChild(tr);

        /**
         * Atualizamos as estatísticas de usuários
         */
        this.updateCount();

    }

    addEventsTr(tr) {

        /**
         * Selecionamos o botão de edição
         */
        tr.querySelector(".btn-edit").addEventListener("click", e => {

            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {

                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");

                if (field) {

                    switch (field.type) {

                        case 'file':
                            continue;

                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name];

                    }

                }

            }

            this.formUpdateEl.querySelector(".photo").src = json._photo;

            this.showPanelUpdate();

        });

    }

    showPanelCreate() {

        /**
         * localiza o formulário de cadastro para
         * esconder.
         */
        document.querySelector("#box-user-create").style.display = "block";

        /**
         * localiza o formulário de update para
         * mostrar.
         */
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate() {

        /**
             * localiza o formulário de cadastro para
             * esconder.
             */
        document.querySelector("#box-user-create").style.display = "none";

        /**
         * localiza o formulário de update para
         * mostrar.
         */
        document.querySelector("#box-user-update").style.display = "block";


    }

    /**
     * Método para atualizar estatísticas de usuários
     */
    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach( tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;
            

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }

}