import React, { useEffect, useState } from 'react';
import './styles/global.scss';
import {DigitsButton} from './components/digits_button/index';
import { log } from 'console';

type InputsContent = {
  input?: string | undefined,
}


function App() {
  var [digits, setDigits] = useState<InputsContent>();
  var [valor, setValor] = useState('');
  var [newNumber, setNewNumber] = useState(true);


  const onHanldeInput = (event:any) => {
      digits = event.target.value;
      if (digits == ',') {
        console.log(digits)
         // virgula();
      }else if(digits == 'ac'){
         // botaoAc();
      }else if(digits == 'clear') {
         // botaoBackspace();
      }else if(digits == '=') {
        console.log(digits)
         // outroTeste(pInp)
         // operador();
      }
      else
      console.log(digits)
        //  digito(pInp);//chama função digito para concatenar os valores
  }

  return (
    <div className="App">
      <div className="container">
        <div className="field-pai">
          {/* <!--Tela que sera exibida--> */}
          <div className="screen-pai">
              <div className="screen">
                  <div className="screen-2">
                      <span id="result-2"></span>
                  </div>
                  <span id="result">
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
                                  <button value='ac' className="clear"><span className="digits">C</span></button>
                                </div>
                                <button  onClick={onHanldeInput} value={7} id="sa" ><span className="digits">7</span></button>
                                <button onClick={onHanldeInput} value={8} ><span className="digits">8</span></button>
                                <button onClick={onHanldeInput} value={9} ><span className="digits">9</span></button>
                                
                            </div>
                            <div>
                                <button onClick={onHanldeInput}  value={4}><span className="digits">4</span></button>
                                <button onClick={onHanldeInput} value={5}><span className="digits">5</span></button>
                                <button onClick={onHanldeInput} value={6}><span className="digits">6</span></button>
                            </div>
                            <div>
                                <button onClick={onHanldeInput} value={1}><span className="digits">1</span></button>
                                <button onClick={onHanldeInput} value={2}><span className="digits">2</span></button>
                                <button onClick={onHanldeInput} value={3}><span className="digits">3</span></button>
                            </div>
                            <button onClick={onHanldeInput}  className='btn-0'><span className="digits">0</span></button>
                            <button onClick={onHanldeInput}  value=','><span className="digits">,</span></button>
                        </div>
                    </div>
                </div>
                  {/* //  <!--Parte dos botões que executam as operações--> */}
                <div className="field-filho-2">
                    <div className="botoes">
                        <button onClick={onHanldeInput} value='clear' className="backspc"><span className="digits-1 ">⌫ </span></button><br />
                        <button  value='+'><span className="digits">+</span></button><br />
                        <button  value='-'><span className="digits">-</span></button><br />
                        <button  value='x'><span className="digits-1">x</span></button><br />
                        <button  value='÷'><span className="digits">÷</span></button>
                        <button onClick={onHanldeInput} value='='><span className="digits">=</span></button>
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
