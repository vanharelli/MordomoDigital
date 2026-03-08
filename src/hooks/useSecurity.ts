import { useEffect } from 'react';

/**
 * FRONTEND ARMOR (ANTI-PIRACY LEVEL 9)
 * Executa travas de segurança globais para proteger o código e dados.
 */
export const useSecurity = () => {
  useEffect(() => {
    // 1. Desabilitar Menu de Contexto (Right-click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Bloquear Atalhos de DevTools e Extração de Dados
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloquear F12
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }

      // Bloquear Ctrl+Shift+I (DevTools)
      // Bloquear Ctrl+Shift+J (Console)
      // Bloquear Ctrl+Shift+C (Inspect)
      // Bloquear Ctrl+U (View Source)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return;
      }

      // Bloquear Ctrl+C (Copy), Ctrl+S (Save), Ctrl+P (Print)
      if (e.ctrlKey && (e.key === 'c' || e.key === 's' || e.key === 'p')) {
        // Permitir copiar em inputs/textareas
        const target = e.target as HTMLElement;
        if (e.key === 'c' && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
          return;
        }
        e.preventDefault();
        return;
      }
    };

    // 3. Bloquear Drag-and-Drop de Mídia
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);
};
