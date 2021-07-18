//variaveis para definir os valores e operações
let valor = '0';
let novoNumero = true;

//função principal, ela receberá os valores e fazer chamados dos metodos necessarios
const botaoNumero = (batata) => {
    if (batata == ',') {
        virgula();
    }else if(batata == 'ac'){
        botaoAc();
    }else if(batata == 'clear') {
        botaoBackspace();
    }else if(batata == 'somar') {
        botaoSomar();
    }else if(batata == 'igual') {
        botaoIgual();
    }
    else
        digito(batata);//chama função digito para concatenar os valores
}


//função responsavel por exibir os valores na calculadora
const atualizarValor = () => {   
    let [parteInteira, parteDecimal] = valor.split(',');
    let valor2 = '';
    beterraba = 0;
    
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

