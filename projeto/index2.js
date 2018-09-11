/**
 * Aula 2 de intrudução
 */

 /**
  * funções
  */

/*   function calc (arg1, arg2, operator) {

      return `${arg1} ${operator} ${arg2} = ` + eval(`${arg1} ${operator} ${arg2}`);

  }

  let result = calc(5, 2, "+");
  console.log(result); */

  /**
   * função anônima
   */

/* let result = (function (arg1, arg2, operator) {

    return `${arg1} ${operator} ${arg2} = ` + eval(`${arg1} ${operator} ${arg2}`);

})(5, 2, "+");


console.log(result); */

/**
 * arrow function
 */

/* calc = (arg1, arg2, operator) => {

    return `${arg1} ${operator} ${arg2} = ` + eval(`${arg1} ${operator} ${arg2}`);

}

let result = calc(5, 2, "+");
console.log(result);  */

/**
 * eventos
 */

/*  window.addEventListener('focus', event => {

    console.log('focus');
    

 });

 document.addEventListener('click', event => {

    console.log('click');
    

 }); */

 /**
  * datas em javascript
  * 
  * temos uma classe pronta para transformar-se em um 
  * objeto.
  */

// let agora = new Date();
// console.log(agora); // Mon Sep 10 2018 21:56:35 GMT-0300 (Horário Padrão de Brasília)
// console.log(agora.getDate()); // 10
// console.log(agora.getFullYear()); // 2018
// console.log(agora.getMonth()); // 8 - array começando em 0
// console.log(agora.toLocaleDateString("pt-BR")); // 10/09/2018

/**
 * array
 */

 /*

 let carros = ["Palio 98", "Toro", "Uno", 10, true, new Date(), function(){}];

 carros.forEach(function(value, index) {
     console.log(index, value);
 }); 

 */

 /**
  * Orientação a objetos
  */

  /**
   * forma antiga de de declarar um objeto
   */

  /* let celular = function () {
      
    this.cor = "prata";

    this.ligar = function() {

        console.log("uma ligação!");

        return "ligando...";
        
    }

  }

  let objeto = new celular();

  console.log(objeto.ligar()); */

  /**
   * forma a partir do ES6.
   */

   class Celular {

        constructor() {
            this.cor = "prata";
        }

        ligar () {

            console.log("uma ligação!");

            return "ligando...";
             
        }

   }

 let objeto = new Celular();

 console.log(objeto.ligar());
  