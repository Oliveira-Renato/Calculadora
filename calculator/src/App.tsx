import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery'
import './styles/global.scss';

type InputsContent = {
  input?: string,
  digits?: number,
}

function App() {
  const result = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const result2 = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  var valor = '0';
  var novoNumero = true;//responsavel por verificar nova entrada de digitos
  var firstValor=0;//separa os primeiros valores para realizar os calculos
  var operacaoEspera:any = null;//responsavel por receber o operador para executar o calculo
  var digits: string = ''
  var resultState = '';
  var listInputs = [''];
  var listInputs2 = [''];

  function onHanldeInput (pInput:string) {
      digits = pInput && pInput;
      
      switch(digits){
        case '.' :
          virgula();
          break;
        case 'ac' :
          botaoAc();
          break;
        case 'clear' :
          botaoBackspace();
          break;
        case '=' :
          listInputs.push(result.current.innerText);
          operador(digits);
          !result2.current.innerText.includes('=') && outroTeste(digits);
          break;
        default:
          digito(digits);
          break;
      }
      console.log('fsmdifdsifkm',listInputs2);
  }

  const operacaoCal = (pOperador:any) => {
    listInputs2.push(pOperador);
    listInputs.push(result.current.innerText); 
    console.log('ta lá',result2.current.innerText[result2.current.innerText.length -1]);
    // if(result2.current.innerText[result2.current.innerText.length -1] == pOperador){
    //   console.log('ta aqui')
    //   result2.current.innerText = listInputs.toString();
    // }else {
      if(pOperador == '+' || '-' || '*' || '/') operador(pOperador);teste(pOperador)
    
  }

  const atualizarValor = () => {   
    result.current.innerText = valor ;
  }

  const digito = (pInput:any) => {
    if(novoNumero) {
      listInputs2.push(digits);
      valor = '' + pInput;
      novoNumero = false;
    }else {
      valor += pInput;
      listInputs2[listInputs2.length -1] = valor;
    }
    
    
    atualizarValor();
  }

  const virgula = () => {
    if(novoNumero) {
      valor = '0,';
      novoNumero = false;
      
    }else if(valor.indexOf('.') == -1) {
      valor += '.';
      digito('');
      atualizarValor();
    }
  }

  const botaoAc = () => {
    novoNumero = true;
    valor = '0';
    firstValor = 0;
    result.current.innerText = ' '
    operacaoEspera = null;
    result2.current.innerText = ' '
    listInputs2 = ['']; 
    atualizarValor();   
  }

  const botaoBackspace = () => {
    novoNumero = true;
    valor = valor.slice(0, -1)
    
    novoNumero && valor =='' && (valor = '0') ;
    atualizarValor()
  }

  const convertValor = () => parseFloat(valor.replace('.',','))

  const operador = (pOperador:any) => {
    if(!result2.current.innerText.includes('=')) {
      // calcular()
      teste(pOperador);
      firstValor = convertValor();
      operacaoEspera=pOperador;
      novoNumero = true;
    }else atualizarValor();
  }

  // function calcular() { 
  //   if(operacaoEspera != null ) {
  //       let resultado = 0;
  //       teste(operacaoEspera)
        
  //       // valor = resultado.toString();
  //   }
  //   novoNumero = true;
  //   operacaoEspera = null;
  //   firstValor = 0;
  //   atualizarValor(); 
  // }

  const teste = (bol:string) => {
    var listResult = listInputs2.toString().replaceAll('/', '÷');
    result2.current.innerText = listResult.replace(/,/g, '') 
    
    if(bol == '=') {
      listResult = eval(listInputs2.toString().replace(/,/g, ''));
      result2.current.innerText += '=';
      result.current.innerText = listResult.toString().length > 10 ? parseFloat(listResult).toFixed(2) : listResult;
      listInputs2 = ['']; 
    }else result.current.innerText =  '';
  }
  const outroTeste = (bol:any) => {
    // result2.current.innerText ="" + resultState + " " + listInputs[listInputs.length-1]  + " " + bol + "";
  }

  return (
    <div className="App">
      <div className="container">
        <div className="field-pai">
          {/* <!--Tela que sera exibida--> */}
          <div className="screen-pai">
              <div className="screen">
                  <div className="screen-2">
                      <span ref={result2} id="result-2"></span>
                  </div>
                  <span ref={result} id="result-1">
                      0
                  </span>
              </div>
          </div>
          {/* <!--Parte dos botões númericos--> */}
          <div className="first-div">
            <div className="container-2">
                <div className="botoes">
                    <div className="field-filho">
                        <div  className="botoes">
                            <div>
                                <div className='c' >
                                  <button onClick={() => onHanldeInput('ac')} value='ac' className="clear"><span className="digits">C</span></button>
                                </div>
                                <button  onClick={() => onHanldeInput('7')}  id="sa" ><span className="digits">7</span></button>
                                <button  value={'8'} onClick={() => onHanldeInput('8')} ><span className="digits">8</span></button>
                                <button onClick={() => onHanldeInput('9')} value={9} ><span className="digits">9</span></button>
                                
                            </div>
                            <div>
                                <button onClick={() => onHanldeInput('4')}  value={4}><span className="digits">4</span></button>
                                <button onClick={() => onHanldeInput('5')} value={5}><span className="digits">5</span></button>
                                <button onClick={() => onHanldeInput('6')} value={6}><span className="digits">6</span></button>
                            </div>
                            <div>
                                <button onClick={() => onHanldeInput('1')} value={1}><span className="digits">1</span></button>
                                <button onClick={() => onHanldeInput('2')} value={2}><span className="digits">2</span></button>
                                <button onClick={() => onHanldeInput('3')} value={3}><span className="digits">3</span></button>
                            </div>
                            <button onClick={() => onHanldeInput('0')}  className='btn-0'><span className="digits">0</span></button>
                            <button onClick={() => onHanldeInput('.')}  value=','><span className="digits">,</span></button>
                        </div>
                    </div>
                </div>
                  {/* //  <!--Parte dos botões que executam as operações--> */}
                <div className="field-filho-2">
                    <div className="botoes">
                        <button onClick={() => onHanldeInput('clear')} value='clear' className="backspc"><span className="digits-1 ">⌫ </span></button><br />
                        <button onClick={()=>operacaoCal('+')} value='+'><span className="digits">+</span></button><br />
                        <button onClick={()=>operacaoCal('-')} value='-'><span className="digits">-</span></button><br />
                        <button onClick={()=>operacaoCal('*')} value='*'><span className="digits-1">*</span></button><br />
                        <button onClick={()=>operacaoCal('/')} value='÷'><span className="digits">÷</span></button>
                        <button onClick={() => onHanldeInput('=')} value='='><span className="digits">=</span></button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
