const Cadastro = require('../firebase/cadastro')
const database = require('../firebase/index')
const Pesquisa = require('../firebase/pesquisa')
const Excluir = require('../firebase/exclusao')

 module.exports = async function IntentNameHandler(req, res) {
  const intentName = req.body.queryResult.intent.displayName;
  
  let novoCadastro;
  
  
  switch(intentName) {
    case "AgProva":
      
      novoCadastro = {
        Finalidade:req.body.queryResult.parameters["Finalidade"],
        CPF: req.body.queryResult.parameters["CPF"].toString(),
        Nome: req.body.queryResult.parameters["Nome"],
        Telefone:req.body.queryResult.parameters["Telefone"],
        CEP: req.body.queryResult.parameters["CEP"],
        Endereco: req.body.queryResult.parameters["Endereco"],
        Especie:req.body.queryResult.parameters["Especie"],
        Calibre:req.body.queryResult.parameters["Calibre"],
        Dia:req.body.queryResult.parameters["Semana"]
      }
      
      return await Cadastro(novoCadastro, 'prova', res)
      
      
    case "AgCurso":
      // metodo de cadastro no curs
      console.log(typeof req.body.queryResult.parameters["Semana"])
      novoCadastro = {
        CPF: req.body.queryResult.parameters["CPF"].toString(),
        Nome: req.body.queryResult.parameters["Nome"],
        Telefone:req.body.queryResult.parameters["Telefone"],
        Nivel:req.body.queryResult.parameters["Curso"],
        Dia:req.body.queryResult.parameters["Semana"]
      }
      
      return await Cadastro(novoCadastro, 'curso', res);
    case "AgAmbos":
    // metodo de cadastro no curso
    novoCadastro = {
      CPF: req.body.queryResult.parameters["CPF"].toString(),
      Nome: req.body.queryResult.parameters["Nome"],
      Telefone:req.body.queryResult.parameters["Telefone"],
      Endereco: req.body.queryResult.parameters["Endereco"],
      CEP: req.body.queryResult.parameters["CEP"],
      Nivel: req.body.queryResult.parameters["Curso"],
      Finalidade:req.body.queryResult.parameters["Finalidade"],
      Especie:req.body.queryResult.parameters["Especie"],
      Calibre:req.body.queryResult.parameters["Calibre"],
      Dia:req.body.queryResult.parameters["Semana"]
    }

    return await Cadastro(novoCadastro, 'ambos', res);
      
    case "PesqContato":
      return await Pesquisa(req.body.queryResult.parameters["Tipo"], res)
    case "ExcluirContato":
      // metodo de cancelamento do cpf
      return await Excluir(req.body.queryResult.parameters["Excluir"], res)
    default:
      break
  }
}