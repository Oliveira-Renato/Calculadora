import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

export  function ThisWelcome() {
        useEffect(() => {
          function welcome(){
            return  toast('Bem Vindo!',
            {
                icon: '💻🚀',
                style: {
                borderRadius: '10px',
                background: 'var(--color-dots)',
                color: 'var(--color-bg)',
                border: '2px solid var(--color-bg)',
                boxShadow: '0 0 4rem var(--color-ghost)',
                },
            }
            );
           }
          welcome();
        },[]);

        return null
  
}