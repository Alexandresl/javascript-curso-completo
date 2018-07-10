class celular {

    constructor () {

        this.cor = "prata";

    }

    ligar () {

        console.log("fazer ligação");
        return "ligando..."

    }

}

let objeto = new celular();

console.log(objeto.cor);