import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/variables.scss';
import './styles/pacman.scss'
import './styles/global.scss';
import { fa0, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
  
import { Toaster } from 'react-hot-toast';
import {ThisWelcome} from './hooks/welcome';

type InputsContent = {
  input?: string,
  digits?: number,
}

function App() {
  const result = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const result2 = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const operators = ['+', '-', '*', '/'];
  var valor = '';
  var novoNumero = true;//responsavel por verificar nova entrada de digitos
  var operacaoEspera:any = null;//responsavel por receber o operador para executar o calculo
  var digits: string = ''
  var listInputs = [''];//just a comment
  var listInputs2 = [''];
  var screen2:string = '';

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
          break;
        default:
          digito(digits);
          break;
      }
  }

  const operacaoCal = (pOperador:string) => {
    if(operators.indexOf(listInputs2[listInputs2.length - 1]) < 0){
        listInputs2.push(pOperador);  
        operador(pOperador);
        teste(pOperador)
    }
  }

  const atualizarValor = () => {   
    result.current.innerText = valor ;
  }

  const digito = (pInput:any) => {
      if(novoNumero ) {
        listInputs2.push(digits);
        valor = '' + pInput;
        novoNumero = false;
      }else {
        console.log('entrou no operador', pInput);
       if( valor[0] !== '0' || pInput !== '0' &&  pInput !== '.') valor += pInput;
       console.log('valor', valor[0]);
        listInputs2[listInputs2.length -1] = valor;
        console.log(listInputs2);                         
      }
    atualizarValor();
  }

  const virgula = () => {
    if(novoNumero) {
      novoNumero = false;
    }else if(valor.indexOf('.') == -1) {
      valor += '.';
      atualizarValor();
    }
  }

  const botaoAc = () => {
    novoNumero = true;
    valor = '0';
    result.current.innerText = ' '
    operacaoEspera = null;
    result2.current.innerText = ' '
    listInputs2 = ['']; 
    atualizarValor();   
  }

  const botaoBackspace = () => {
    novoNumero = true;
    valor = valor.slice(0, -1)
    listInputs2.pop();
    
    if(novoNumero && valor ==''){
      valor = '0';
      result2.current.innerText = result2.current.innerText.slice(0, -1)
      listInputs2 = [result2.current.innerText]; 
     } ;

    
    atualizarValor()
   
  }

  const convertValor = () => parseFloat(valor.replace('.',','))

  const operador = (pOperador:any) => {
    screen2 = result2.current.innerText ;
    console.log(screen2[screen2.length -1])
    if(screen2[screen2.length -1] !== '=') {
      console.log('entrou')
      teste(pOperador);
      operacaoEspera=pOperador;
      novoNumero = true;
    }else{
      listInputs2= [''];
      listInputs2.push(result.current.innerText)
      listInputs2.push(pOperador);
    }
  }


  const teste = (bol:string) => {
    console.log('teste',  listInputs2.length)
    if(listInputs2.length <= 2 && result.current.innerText == '0'){
      listInputs2[0] = '0';
    }
    var listResult = listInputs2.toString().replaceAll('/', '÷');
    result2.current.innerText = listResult.replace(/,/g, '') 
    
    if(bol == '=' && operators.indexOf(listResult[listResult.length - 1]) == -1) {
      listResult = eval(listInputs2.toString().replace(/,/g, ''));
      result2.current.innerText += '=';
      result.current.innerText = listResult.toString().length > 10 ? parseFloat(listResult).toFixed(2) : listResult;
      listInputs2 = ['']; 
    }else result.current.innerText =  '';
    novoNumero = true;
    
  }
 

  return (
    <div className="App">
      <Toaster />
      <ThisWelcome /> 
      <div className="container">
        <div className="field-pai">
          {/* <!--Tela que sera exibida--> */}
          <div className="screen-pai">
              <div className="screen  pacman-button">
                  <div className="ghost"></div>
                  <div className="pacman"></div>
                  <div className="screen-2">
                      <span ref={result2} id="result-2" ></span>
                  </div>
                  <span ref={result} id="result-1">
                      0
                  </span>
              </div>
          </div>
          {/* <!--Parte dos botões númericos--> */}
          <div className="first-div">
            <div className="container-2 ">
                <div className="botoes">
                    <div className="field-filho">
                        <div  className="botoes">
                            <div>
                                <div className='c' >
                                  <button onClick={() => onHanldeInput('ac')} value='ac' className="clear"><span className="digits">C</span></button>
                                </div>
                                <button  onClick={() => onHanldeInput('7')}  id="sa" ><span className="digits"><FontAwesomeIcon icon={fa7} /></span></button>
                                <button  value={'8'} onClick={() => onHanldeInput('8')} ><span className="digits"><FontAwesomeIcon icon={fa8} /></span></button>
                                <button onClick={() => onHanldeInput('9')} value={9} ><span className="digits"><FontAwesomeIcon icon={fa9} /></span></button>
                                
                            </div>
                            <div>
                                <button onClick={() => onHanldeInput('4')}  value={4}><span className="digits"><FontAwesomeIcon icon={fa4} /></span></button>
                                <button onClick={() => onHanldeInput('5')} value={5}><span className="digits"><FontAwesomeIcon icon={fa5} /></span></button>
                                <button onClick={() => onHanldeInput('6')} value={6}><span className="digits"><FontAwesomeIcon icon={fa6} /></span></button>
                            </div>
                            <div>
                                <button onClick={() => onHanldeInput('1')} value={1}><span className="digits"><FontAwesomeIcon icon={fa1} /></span></button>
                                <button onClick={() => onHanldeInput('2')} value={2}><span className="digits"><FontAwesomeIcon icon={fa2} /></span></button>
                                <button onClick={() => onHanldeInput('3')} value={3}><span className="digits"><FontAwesomeIcon icon={fa3} /></span></button>
                            </div>
                            <button onClick={() => onHanldeInput('0')}  className='btn-0'><span className="digits"><FontAwesomeIcon icon={fa0} /></span></button>
                            <button onClick={() => onHanldeInput('.')}  value=','><span className="digits">.</span></button>
                        </div>
                    </div>
                </div>
                  {/* //  <!--Parte dos botões que executam as operações--> */}
                <div className="field-filho-2">
                    <div className="botoes">
                        <button onClick={() => onHanldeInput('clear')} value='clear' className="backspc"><span className="digits-1 "><FontAwesomeIcon icon={faDeleteLeft} /></span></button><br />
                        <button onClick={()=>operacaoCal('+')} value='+'><span className="digits">+</span></button><br />
                        <button onClick={()=>operacaoCal('-')} value='-'><span className="digits">-</span></button><br />
                        <button onClick={()=>operacaoCal('*')} value='*'><span className="digits-1">x</span></button><br />
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
