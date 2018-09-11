
/**
 * Primeiro exemplo
 */

// console.log("Olá mundo!");


/**
 * Case sensitive.
 * alert (função nativa do js) é diferente de Alert
 */

//alert("Olá mundo!");
//Alert("Olá mundo!"); // este não funciona.

/**
 * Usando comentários de uma linha e de bloco.
 */

 //console.log("Olá mundo");
 
 /*console.log("Olá mundo");
 console.log("Olá mundo");*/
 
/**
 * Variáveis
 */

 //var olaMundo = "Olá mundo!";

 //console.log(olaMundo);
 
/**
 * Operadores
 * 
 * O = (igual) e um operador de atribuição
 * 
 * - Operadores de comparação
 * O == compara se os valores são iguais
 * O === compara se os valoes e os tipos são iguais
 * o != compara se os valores são diferentes
 * o !== compara se os valores e tipos diferentes
 * 
 * - Operadores lógicos
 * 
 *  && o "AND"
 *  || é o "OR"
 * 
 *  - Operadores de incremento/decremento
 * 
 *  ++
 *  --
 */

//let a = 10;
//const b = "10";

// console.log(a == b); // resultado true
// console.log(a === b); // resultado false

//console.log(a == b || typeof a == 'string');

/**
 * exemplo de  bloco if - else 
 */

/*  cor = 'azul';

 if (cor === 'verde') {

     console.log('siga');

 } else if (cor === 'amarelo') {

     console.log('atenção');
     
 } else if (cor == 'vermelho') {

     console.log('pare');

 } */

 /**
  * exemplo de switch
  */

/* let cor = "azul";

switch (cor) {
    case "verde":
        console.log('Siga');      
        break;
    case "amarelo":
        console.log('Atenção');      
        break;
    case "vermelho":
        console.log('Pare');      
        break;
    default:
        console.log('Não sei!');
        break;        
} */

/**
 * laços de repetição.
 */

let n = 5;

for (let i = 0; i <= 10; i++) {

    let result = `${n} * ${i} = ${ n*i }`;

    console.log(result);
    
}
