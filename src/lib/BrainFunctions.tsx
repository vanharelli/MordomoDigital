export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24h em ms

export const validateSession = () => {
  const sessionStr = localStorage.getItem('alfa_session');
  if (!sessionStr) return null;

  try {
    const session = JSON.parse(sessionStr);
    const isExpired = Date.now() - session.startTime > SESSION_DURATION;
    
    if (isExpired) {
      localStorage.removeItem('alfa_session');
      window.location.href = "https://www.alfaplazahotel.com.br";
      return null;
    }
    
    return session;
  } catch {
    localStorage.removeItem('alfa_session');
    return null;
  }
};

export const createSession = () => {
  const session = {
    startTime: Date.now()
  };
  localStorage.setItem('alfa_session', JSON.stringify(session));
};
