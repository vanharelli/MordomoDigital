import { useEffect, useState, useCallback } from 'react';

/**
 * 4. RETENTION & PWA VIEWPORT (DOUBLE-BACK PROTOCOL)
 * Implement the useDoubleBackExit Hook at the root.
 * History Trap: Intercept the popstate event.
 */
export const useDoubleBackExit = () => {
  const [showToast, setShowToast] = useState(false);
  const [lastPress, setLastPress] = useState(0);

  const handlePopState = useCallback(() => {
    const now = Date.now();
    const timeDiff = now - lastPress;

    if (timeDiff < 2000) {
      // 2. Threshold: Only allow exit if the second press occurs within 2 seconds.
      // Allow browser default back (exit app or go back)
      // Since we are trapping, we might need to manually unbind or just let it pass
      // In this simulated environment, we just let the event bubble or execute a close logic if possible.
      // For a PWA, history.back() twice might be needed if we pushed state.
      // However, usually `history.back()` is enough if we remove the listener.
      
      // Clear trap state to allow exit
      window.history.back(); 
    } else {
      // 1. First back-press must trigger a custom Toast
      setLastPress(now);
      setShowToast(true);
      
      // Re-push state to maintain the trap (History Trap)
      // This prevents the browser from actually going back in history stack
      window.history.pushState(null, '', window.location.pathname);
      
      // Hide toast after 2s
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [lastPress]);

  useEffect(() => {
    // Initialize History Trap
    window.history.pushState(null, '', window.location.pathname);
    
    const onPopState = (e: PopStateEvent) => {
      e.preventDefault();
      handlePopState();
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [handlePopState]);

  return showToast;
};
