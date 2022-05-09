import { useEffect } from "react";

export function useResultShow(valor:any){
    useEffect(() => {
        let [parteInteira, parteDecimal] = valor.split(',');
        let valor2 = '';
        let beterraba = 0;
        let result:any = document.getElementById('result')
        
        for(let i = parteInteira.length-1; i >= 0; i--) {
            if (++beterraba > 3) {
                valor2 = '.' + valor2;
                beterraba = 1;
            }
            valor2 =parteInteira[i] + valor2;
        }

        valor2 = valor2 + (parteDecimal?  ',' + parteDecimal: '');

        valor2 = valor2.replace(/\s/g, '');
        result.innerText = valor2;
    })
}