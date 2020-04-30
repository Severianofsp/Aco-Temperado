// pesquisa
const database = require('./index')

// curso / prova / curso e prova

// geral

module.exports = async function Pesquisa( word, res) {
  console.log(word)
    database
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          res.json({ fulfillmentText: "Nenhum documento encontrado" });
        }

        let lista_de_resultados = [];
      

        snapshot.forEach(doc => {
          // iterar o Tipo e ver as chaves
          let lista = Object.values(doc.data()); // retorna lista com o valor de cada chave exemplo: { nome: flavio, nome: felipe } > [flavio, felipe]
          lista.map(valor => {
            // comparar o input vindo do dialog flow e comparando com o valor dentro da lista [ transformando em string e colocando em lower case]
             
            
            if( typeof valor === 'string') {
               if(word.toLowerCase() == valor.toLowerCase()) {
                 lista_de_resultados.push(doc.data())
                 console.log(lista_de_resultados)
               }
             }
            if(typeof valor === 'object') {
              if(valor !== null) {
              let items = Object.values(valor)
              items.map( item  => {
                if(item.toLowerCase() == word.toLowerCase() && typeof item === 'string') {
                  lista_de_resultados.push(doc.data())
                }
              
              })
              
              }
            }
            
          });
        });
      
      let nova_lista =  format(lista_de_resultados);
      if(nova_lista.length <= 0) {
        res.json({ fulfillmentText: "Não foi possível encontrar nenhum cadastro."})
      } else{
        res.json({ fulfillmentText: nova_lista})
      }
    }).catch(err => console.log(err))
}

function format(array) {
  let lista_formatada = []
  console.log()
  array.map(perfil => {
    let mask_cpf = CPFMASK(perfil.CPF)

    if(perfil.tipo == 'curso') {
      
      
      lista_formatada.push(
        `Nome completo: ${perfil.nome}\n
CPF: ${mask_cpf}\n
Nivel: ${perfil.curso.nivel}\n 
Telefone: ${perfil.telefone}\n 
Dia de preferência: ${perfil.dia}
Data: ${perfil.data} \n
--------------- \n`
      );
      
   

      
      
      // Nivel de Pistola, Nivel 1 de Carabina
    }
    if(perfil.tipo == 'prova') {
      
      lista_formatada.push(
      ` 
\n *DADOS PESSOAIS* \n
 Nome completo: ${perfil.nome}\n
 CPF: ${mask_cpf}\n
 Endereço: ${perfil.endereco}\n
 CEP: ${perfil.cep}\n
 Telefone: ${perfil.telefone}\n
\n *DADOS DA ARMA* \n
 Finalidade: ${perfil.prova.finalidade}\n
 Espécie: ${perfil.prova.especie}\n
 Calibre: ${perfil.prova.calibre}\n
 Dia de preferência: ${perfil.dia}\n
 Data: ${perfil.data} \n
--------------- \n`
      )
      
      
    }
    
    if(perfil.tipo == 'ambos') {
      
      lista_formatada.push(
      `  
\n *DADOS PESSOAIS* \n
Nome completo: ${perfil.nome}
CPF: ${mask_cpf} \n
Endereço: ${perfil.endereco} - CEP: ${perfil.cep}\n
Telefone: ${perfil.telefone} \n
\n *DADO DO CURSO* \n
Nível: ${perfil.curso.nivel} \n
\n *DADOS DA ARMA* \n
Finalidade: ${perfil.prova.finalidade} \n
Espécie: ${perfil.prova.especie} \n
Calibre: ${perfil.prova.calibre} \n
Dia de preferência: ${perfil.dia} \n
Data: ${perfil.data} \n
--------------- \n`
      )
      
    }
  })
  
  return lista_formatada.join('')
}

// 111.111.111-11
// 111111111111

function CPFMASK(cpf) {
  let newcpf = cpf.split('') // separação dos numeros => [ '1', '1','1']
  let mask = []
  newcpf.map( (numero, index) => {
    
    if( index == 2 || index == 5) {
      mask.push(numero + '.')
    }
    else if (index == 8) {
      mask.push(numero + '-')
    }else {
      mask.push(numero)
    }
  })
  return mask.join('')
}