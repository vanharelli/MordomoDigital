import { useEffect, useState, useCallback } from 'react';

/**
 * 1. FRONTEND ARMOR (ANTI-PIRACY LEVEL 9)
 * Intercepts user interactions to prevent data extraction and inspection.
 */
export const useSecurity = () => {
  useEffect(() => {
    const blockContext = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const blockKeys = (e: KeyboardEvent) => {
      // 1. DevTools Hijack (F12, Ctrl+Shift+I, J, C, U)
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // 2. Data Extraction Block (Ctrl+C, Ctrl+S, Ctrl+P)
      if (e.ctrlKey && ['C', 'S', 'P'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const blockDrag = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Attach Listeners
    document.addEventListener('contextmenu', blockContext);
    document.addEventListener('keydown', blockKeys);
    document.addEventListener('dragstart', blockDrag);

    return () => {
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('keydown', blockKeys);
      document.removeEventListener('dragstart', blockDrag);
    };
  }, []);
};

/**
 * 4. RETENTION & PWA VIEWPORT (DOUBLE-BACK PROTOCOL)
 * Traps history popstate to prevent accidental exits.
 */
export const useDoubleBackExit = () => {
  const [showToast, setShowToast] = useState(false);
  
  const handlePopState = useCallback((e: PopStateEvent) => {
    // Prevent default back behavior temporarily
    e.preventDefault();
    
    // Check global state or local ref for last press time
    const now = Date.now();
    const lastPress = parseInt(sessionStorage.getItem('last_back_press') || '0');
    
    if (now - lastPress < 2000) {
      // Allow exit (or navigate back actually)
      // Since we pushed state, we might need to go back twice or just let it happen
      // In a strict SPA PWA, we usually just let the browser exit if it's the root,
      // but here we are simulating a trap.
      // For actual PWA, history.back() would work if we hadn't pushed state.
      // We will clear the trap.
      sessionStorage.removeItem('last_back_press');
      // history.go(-1); // Execute real back
    } else {
      // First Press
      sessionStorage.setItem('last_back_press', now.toString());
      // Push state again to maintain the trap
      window.history.pushState(null, '', window.location.pathname);
      
      // Show Toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, []);

  useEffect(() => {
    // Initialize Trap
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  return { showToast };
};
