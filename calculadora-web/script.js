//variaveis para definir os valores e operações
let valor = '0';//valor atual 
let novoNumero = true;//responsavel por verificar nova entrada de digitos
let firstValor=0;//separa os primeiros valores para realizar os calculos
let operacaoEspera = null;//responsavel por receber o operador para executar o calculo

/**
 * 
 * batata = parametro com os valores a serem tratados  
 */
const botaoNumero = (batata) => {
    if (batata == ',') {
        virgula();
    }else if(batata == 'ac'){
        botaoAc();
    }else if(batata == 'clear') {
        botaoBackspace();
    }else if(batata == '=') {
        teste(batata)
        operador();
    }
    else
        digito(batata);//chama função digito para concatenar os valores
}


/**
 * sapo= parametro responsavel para levar a oparação que deve ser executada
 * 
 */
const operacaoCal = (sapo) => {
    if(sapo == '+' || '-' || 'x' || '÷') {
        operador(sapo);
        teste(sapo)
     } else
        console.log('erro')
}


//função responsavel por exibir os valores na calculadora
const atualizarValor = () => {   
    let [parteInteira, parteDecimal] = valor.split(',');
    let valor2 = '';
    let beterraba = 0;
    
    for(let i = parteInteira.length-1; i >= 0; i--) {
        if (++beterraba > 3) {
            valor2 = '.' + valor2;
            beterraba = 1;
        }
        valor2 =parteInteira[i] + valor2;
    }

    valor2 = valor2 + (parteDecimal?  ',' + parteDecimal: '');

    valor2 = valor2.replace(/\s/g, '');
    document.querySelector('#result').innerText = valor2;
}



//função para arrumar os numeros
const digito = (n) => {
    if(novoNumero) {
        valor = '' + n;
        novoNumero = false;
    }else 
        valor += n;
        atualizarValor();   
}



//tratamento da virgula
const virgula = () => {
    if(novoNumero) {
        valor = '0,';
        novoNumero = false;
    }else if(valor.indexOf(',') == -1) //se valor já possuir uma virgula, então a função retornará -1 e não exibirá outra virgula
        valor += ',';
        digito(' ')
        atualizarValor();
    
        
}


//tratamento do botão AC(ALL CLEAR)
const botaoAc = () => {
        novoNumero = true;
        valor = '0';
        firstValor = 0;
        document.querySelector('#result-2').innerText = ''
        operacaoEspera = null;
        //document.querySelector('#result-2').innerText = ''
        atualizarValor();  
}

//tratamento do botão backspace
const botaoBackspace = () => {
    novoNumero = true;
    valor = valor.slice(0, -1)
    
    if(novoNumero && valor =='') {
        valor = '0';
    }
    atualizarValor()
}

//converte o valor atual em float number
const convertValor = () => parseFloat(valor.replace('.',','))

/**
 * op=operadores aritmeticos
 * 
 */
const operador = (op) => {
    calcular();
    firstValor = convertValor();
    operacaoEspera=op;
    novoNumero = true;
}

//responsavel por realizar os calculos
const calcular = () => {
    if(operacaoEspera != null) {
        let resultado = 0;
        switch(operacaoEspera) {
            case '+':
                resultado = firstValor + convertValor();
                break;
            case '-':
                resultado = firstValor - convertValor();
                break;
            case 'x':
                resultado = firstValor * convertValor();
                break;
            case '÷':
                resultado = firstValor / convertValor();
                break;
        }
        valor = resultado.toString().replace(',','.')//convertendo o resultado em string
    }
    novoNumero = true;
    operacaoEspera = null;
    firstValor = 0;
    atualizarValor(); 
}


const teste = (bol) => {
    document.querySelector('#result-2').innerText = firstValor + bol;
}



/*
//Função para operações
const tratamento = (pa) => {
      
    switch(pa) {
        case 'op':
           n1=  valor+'+';
           teste(n1)
           zerarDisplay();
           verificar();
        break;
        case 'op-2':digito();
        break;
        case 'op-3':digito();
        break;
        case 'op-4':digito();
        break;
      }

        
}

const zerarDisplay = () => {
    novoNumero = true;
        valor = '';
        atualizarValor(); 
}
const verificar = () => {
    if(n1.indexOf('+') != -1)     {//se tive
        console.log('lol')
    }else
        atualizarValor()
    
}


///BOTÃO CALCULAR
const botaoCalcular = () => {
    novoNumero= true
    let c = parseFloat(n1)
    let b = parseFloat(valor)

    if(novoNumero){
        valor = c + b
        document.querySelector('#result').innerText = valor.toString()
        atualizarValor()
        novoNumero= false
    }
    
    
}

*/