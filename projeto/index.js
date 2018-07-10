let celular = function() {
    
    this.cor = "prata";

    this.ligar = function(){
        
        console.log("fazer ligação");
        return "ligando..."        

    }


}

let objeto = new celular();

console.log(objeto.ligar());
