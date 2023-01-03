const express = require('express')
const app = express()

const fs = require('fs');

const obj = {
    "C0": "1310",
    "INSCRICAO": "4221622543",
    "RAZAO_SOCIAL": "NELCIVANE VILELA DE MORAIS",
    "FANTASIA": "CELMA DA SILVA SOUZA",
    "EMAIL": "LUCIENEPE@GMAIL.COM",
    "DDD": "62",
    "TELEFONE": "51847208",
    "FAX": "3839904127",
    "ENDERECO_FAT": "SITIO TRES PONTA ",
    "BAIRRO_FAT": "ZONA RURAL",
    "CEP": "83777566",
    "NUMERO": "3753",
    "CGC": "242.580.522/21",
    "OBSERVACAO": "Cliente de teste gerado através da API fake."
}

app.get('/grava/:qtd', (req, res) => {

    const qtd = req.params.qtd
    delet()

    console.time('grava');

    for(let i = 0; i < qtd; i++){
        grava()
    }

    console.timeEnd('grava');

    res.status(200).send(`Gravado os ${qtd} com sucesso!`)

})

app.get('/le', (req, res) => {


    console.time('le');

    const result = le()

    console.timeEnd('le');

    res.status(200).send(result)

})

function grava() {
    fs.appendFileSync('results.json', JSON.stringify(obj).concat('\n'), function (err) {
        if (err) throw err;
        console.log('Inserido');
    });
}

function le(){

   const buffer = fs.readFileSync('results.json', 'utf-8')
   const array = buffer.split(/\r?\n/)

   var result = []

   array.map(line => {

    if(line){
        result.push(JSON.parse(line))
    }
     
   })

   return result
}

function delet(){
    fs.unlink('results.json', function (err) {            
        if (err) {                                                 
            console.error(err);                                    
        }                                                          
       console.log('File has been Deleted');                           
    });    
}




const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Rodando na porta ${PORT}`))
