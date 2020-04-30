// cancelar cadastro do banco de dados
const database = require('./index')


module.exports =  function Excluir(cpf, res) {
    database.get().then(function(snapshot) {
    snapshot.forEach(function(doc) {
      if(doc.data().CPF == cpf) {
        console.log(doc.data())
        
                  res.json({
            fulfillmentText: `
  *Perfil removido com sucesso!*\n
Nome: ${doc.data().nome + " " + doc.data().sobrenome}\n
CPF: ${doc.data().CPF}\nTelefone: ${
              doc.data().telefone
            }
---------------\n
`
          });
         doc.ref.delete();
      }
    });
    res.json({ fulfillmentText: "Não foi possível encontrar o perfil" });
  })
      .catch(function(error) {
        console.log(error);
      });
}