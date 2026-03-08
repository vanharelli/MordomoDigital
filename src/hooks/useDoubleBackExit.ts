import { useState, useEffect } from 'react';

/**
 * RETENTION & PWA VIEWPORT (DOUBLE-BACK PROTOCOL)
 * Intercepta o evento de retorno do navegador/sistema.
 * O primeiro retorno dispara um aviso, o segundo (dentro de 2s) confirma a saída.
 */
export const useDoubleBackExit = () => {
  const [showToast, setShowToast] = useState(false);
  const [lastBackPress, setLastBackPress] = useState(0);

  useEffect(() => {
    // 1. Injetar estado inicial na pilha de histórico
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      const now = Date.now();
      
      if (now - lastBackPress < 2000) {
        // Se a segunda pressão ocorrer em menos de 2s, permite sair (volta de verdade)
        window.history.back();
      } else {
        // Primeira pressão: Bloqueia a volta e mostra o aviso
        window.history.pushState(null, '', window.location.href);
        setLastBackPress(now);
        setShowToast(true);
        
        // Esconde o aviso após 2 segundos
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [lastBackPress]);

  return showToast;
};
