const database = require('./index')

const Cadastro = async (formulario, tipo, callback) => {
  
 switch(tipo) {
   case "prova":
      database.where("CPF","==",formulario.CPF).get().then(function(snapshot) {
        let unicidade = true
        snapshot.forEach(function(doc) {
         if(doc.exists) {
           unicidade = false;
         }
      });
        if(unicidade) {
        database.doc().set({
            CPF: formulario.CPF,
            nome: formulario.Nome,
            telefone: formulario.Telefone,
            endereco: formulario.Endereco,
            cep: formulario.CEP,
            prova: {
              especie: formulario.Especie,
              calibre: formulario.Calibre,
              finalidade: formulario.Finalidade
            },
            curso: null,
            tipo: 'prova',
            data: date,
            dia: formulario.Dia
          }).catch(error => console.log(error))
        console.log('cadastro com sucesso')
        return callback.json({
          fulfillmentText: "O cadastro foi realizado com sucesso!"
        });
      } else {
        return callback.json({
          fulfillmentText: "Esse cadastro já existe"
        });
        }
      }).catch(error => console.log(error))
     
      
     break;
   case "curso":
      database.where("CPF","==",formulario.CPF).get().then(function(snapshot) {
        let unicidade = true
        snapshot.forEach(function(doc) {
         if(doc.exists) {
           unicidade = false;
         }
      });
        if(unicidade) {
        database.doc().set({
            CPF: formulario.CPF,
            nome: formulario.Nome,
            telefone: formulario.Telefone,
            endereco: null,
            cep: null,
            prova: null,
            curso: {nivel: formulario.Nivel},
            tipo: 'curso',
            data: date,
            dia: formulario.Dia
          }).catch(error => console.log(error))
        console.log('cadastro com sucesso')
        return callback.json({
          fulfillmentText: "O cadastro foi realizado com sucesso!"
        });
      } else {
        return callback.json({
          fulfillmentText: "Esse cadastro já existe"
        });
        }
      }).catch(error => console.log(error))
     
     break
   case "ambos":
      let unicidade = true;
      database.where("CPF","==",formulario.CPF).get().then(function(snapshot) {
        snapshot.forEach(function(doc) {
         if(doc.exists) {
           unicidade = false;
         }
      });
        if(unicidade) {
        database.doc().set({
            CPF: formulario.CPF,
            nome: formulario.Nome,
            telefone: formulario.Telefone,
            endereco: formulario.Endereco,
            cep: formulario.CEP,
            prova: {
              especie: formulario.Especie,
              calibre: formulario.Calibre,
              finalidade: formulario.Finalidade
            },
            curso: {
              nivel: formulario.Nivel
            },
            tipo: 'ambos',
            data: date,
            dia: formulario.Dia,
          }).catch(error => console.log(error))
        console.log('cadastro com sucesso')
        return callback.json({
          fulfillmentText: "O cadastro foi realizado com sucesso!"
        });
      } else {
        return callback.json({
          fulfillmentText: "Esse cadastro já existe"
        });
        }
      }).catch(error => console.log(error))
     
   default:
     return false
 }

}

// date
let date = new Date();
    date =
      date.getUTCDate() +
      "/" +
      ("00" + (date.getUTCMonth() + 1)).slice(-2) +
      "/" +
      date.getUTCFullYear();

module.exports = Cadastro