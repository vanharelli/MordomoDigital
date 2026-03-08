import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GuestProvider, useGuest } from './context/GuestContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useSecurity } from './hooks/useSecurity';
import { useDoubleBackExit } from './hooks/useDoubleBackExit';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import RadarScreen from './screens/RadarScreen';
import AdminScreen from './screens/AdminScreen';
import ProductTableScreen from './screens/ProductTableScreen';
import ExtrasScreen from './screens/ExtrasScreen';
import RoomServiceScreen from './screens/RoomServiceScreen';
import IronScreen from './screens/IronScreen';
import HairDryerScreen from './screens/HairDryerScreen';
import GarageScreen from './screens/GarageScreen';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useGuest();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/radar" 
        element={
          <ProtectedRoute>
            <RadarScreen />
          </ProtectedRoute>
        } 
      />
      <Route path="/admin-alpha" element={<AdminScreen />} />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <ProductTableScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/extras" 
        element={
          <ProtectedRoute>
            <ExtrasScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/room-service" 
        element={
          <ProtectedRoute>
            <RoomServiceScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/iron" 
        element={
          <ProtectedRoute>
            <IronScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hair-dryer" 
        element={
          <ProtectedRoute>
            <HairDryerScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/garage" 
        element={
          <ProtectedRoute>
            <GarageScreen />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const SecurityLayer = () => {
  // 1. FRONTEND ARMOR (ANTI-PIRACY LEVEL 9)
  useSecurity();
  
  // 4. RETENTION & PWA VIEWPORT (DOUBLE-BACK PROTOCOL)
  const showDoubleBackToast = useDoubleBackExit();

  return (
    <>
      <AnimatePresence>
        {showDoubleBackToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[99999] bg-[#0B1A30]/95 border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.5)] font-bold text-[10px] uppercase tracking-[0.2em] backdrop-blur-xl whitespace-nowrap text-center flex items-center justify-center min-w-[280px]"
          >
            Pressione voltar novamente para sair
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <GuestProvider>
      <Router>
        <SecurityLayer />
        <AppRoutes />
      </Router>
    </GuestProvider>
  );
}

export default App;
