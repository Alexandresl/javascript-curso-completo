const nome = document.querySelector('#exampleInputName');
const gender = document.querySelectorAll('#form-user-create [name=gender]:checked');
const birth = document.querySelector('#exampleInputBirth');
const country = document.querySelector('#exampleInputCountry');
const email = document.querySelector('#exampleInputEmail');
const password = document.querySelector('#exampleInputPassword');
const photo = document.querySelector('#exampleInputFile');
const admin = document.querySelector('#exempleInputAdmin');


var fields = document.querySelectorAll('#form-user-create [name]');

fields.forEach((field) => {

    if (field.name === 'gender') {
        if (field.checked) console.log('Sim', field);
    } else {
        console.log('Não');
    }

});