import React, { createContext, useContext, useState } from 'react';

interface GuestContextType {
  guestName: string;
  roomNumber: string;
  setGuestData: (name: string, room: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export const GuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guestName, setGuestName] = useState(() => localStorage.getItem('marketelli_guestName') || '');
  const [roomNumber, setRoomNumber] = useState(() => localStorage.getItem('marketelli_roomNumber') || '');

  const setGuestData = (name: string, room: string) => {
    setGuestName(name);
    setRoomNumber(room);
    localStorage.setItem('marketelli_guestName', name);
    localStorage.setItem('marketelli_roomNumber', room);
  };

  const logout = () => {
    setGuestName('');
    setRoomNumber('');
    localStorage.removeItem('marketelli_guestName');
    localStorage.removeItem('marketelli_roomNumber');
  };

  return (
    <GuestContext.Provider value={{
      guestName,
      roomNumber,
      setGuestData,
      logout,
      isAuthenticated: !!guestName && !!roomNumber
    }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error('useGuest must be used within a GuestProvider');
  }
  return context;
};
