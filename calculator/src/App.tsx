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
  let valor = '0';//valor atual 
  let novoNumero = true;//responsavel por verificar nova entrada de digitos
  let firstValor=0;//separa os primeiros valores para realizar os calculos
  let operacaoEspera:any = null;//responsavel por receber o operador para executar o calculo
  var digits: string = ''

  function onHanldeInput (pInput:string) {
      digits = pInput && pInput;
      switch(digits){
        case ',' :
          virgula();
          break;
        case 'ac' :
          botaoAc();
          break;
        case 'clear' :
          botaoBackspace();
          break;
        case '=' :
          operador(digits);
          break;
        default:
          digito(digits);
          break;
      }
  }

  /**
 * sapo= parametro responsavel para levar a oparação que deve ser executada
 * 
 */
 const operacaoCal = (sapo:any) => {
   if(sapo == '+' || '-' || 'x' || '÷') operador(sapo);teste(sapo)
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
  result.current.innerText =  valor2 && (valor2);
}

//função para arrumar os numeros
const digito = (n:any) => {
  if(novoNumero) {
      valor = '' + n;
      novoNumero = false;
  }else {
      valor += n;
      atualizarValor();
  }   
}

//tratamento da virgula
const virgula = () => {
  if(novoNumero) {
    valor = '0,';
    novoNumero = false;
  }
  if(valor.indexOf(',') == -1) {
    valor += ',';
    digito(' ');
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
      atualizarValor();   
}

const botaoBackspace = () => {
  novoNumero = true;
  valor = valor.slice(0, -1)
  
  novoNumero && valor =='' && (valor = '0') ;
  atualizarValor()
}
//converte o valor atual em float number
const convertValor = () => parseFloat(valor.replace('.',','))

const operador = (op:any) => {
  calcular();
  firstValor = convertValor();
  operacaoEspera=op;
  novoNumero = true;
}

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
      valor = resultado.toString()//convertendo o resultado em string
  }
  novoNumero = true;
  operacaoEspera = null;
  firstValor = 0;
  atualizarValor(); 
}

const teste = (bol:string) => {
  result2.current.innerText = "" + firstValor + " " + bol + "";
}
const outroTeste = (bol:any) => {
  result2.current.innerText ="" + firstValor + " " + operacaoEspera + " " + valor  + bol && (bol);
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
                            <button onClick={() => onHanldeInput(',')}  value=','><span className="digits">,</span></button>
                        </div>
                    </div>
                </div>
                  {/* //  <!--Parte dos botões que executam as operações--> */}
                <div className="field-filho-2">
                    <div className="botoes">
                        <button onClick={() => onHanldeInput('clear')} value='clear' className="backspc"><span className="digits-1 ">⌫ </span></button><br />
                        <button onClick={()=>operacaoCal('+')} value='+'><span className="digits">+</span></button><br />
                        <button onClick={()=>operacaoCal('-')} value='-'><span className="digits">-</span></button><br />
                        <button onClick={()=>operacaoCal('x')} value='x'><span className="digits-1">x</span></button><br />
                        <button onClick={()=>operacaoCal('÷')} value='÷'><span className="digits">÷</span></button>
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
