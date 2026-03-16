import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; 
import Carreras from './pages/Carreras'; 
import AgregarParticipantes from './pages/AgregarParticipantes'; 
import EditarUsuario from "./pages/EditarUsuario";
import NotFound from './pages/NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true;
  
   if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/* redirige raíz a dashboard si logueado */}
      {/* Rutas protegidas (admin) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/carreras"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Carreras />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/agregar"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AgregarParticipantes />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios/editar/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <EditarUsuario  />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
