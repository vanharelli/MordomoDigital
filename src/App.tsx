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
import RestaurantScreen from './screens/RestaurantScreen';
import IronScreen from './screens/IronScreen';
import HairDryerScreen from './screens/HairDryerScreen';
import GarageScreen from './screens/GarageScreen';
import PrintingScreen from './screens/PrintingScreen';
import GuardaVolumeScreen from './screens/GuardaVolumeScreen';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useGuest();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const HomeRoute: React.FC = () => {
  const { isAuthenticated } = useGuest();
  return isAuthenticated ? <DashboardScreen /> : <LoginScreen />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
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
        path="/restaurant" 
        element={
          <ProtectedRoute>
            <RestaurantScreen />
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
      <Route 
        path="/printing" 
        element={
          <ProtectedRoute>
            <PrintingScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/xerox" 
        element={
          <ProtectedRoute>
            <PrintingScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/guarda-volume" 
        element={
          <ProtectedRoute>
            <GuardaVolumeScreen />
          </ProtectedRoute>
        } 
      />
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="bg-[#0B1A30]/95 border border-[#D4AF37] text-[#D4AF37] px-8 py-6 rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.8)] font-bold text-sm uppercase tracking-[0.2em] text-center">
              Pressione voltar novamente para sair
            </div>
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
