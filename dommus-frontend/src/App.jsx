import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import EmpreendimentosPage from './pages/EmpreendimentosPage';
import EmpreendimentoForm from './pages/EmpreendimentoForm';
import UnidadesPage from './pages/UnidadesPage';
import UnidadeForm from './pages/UnidadeForm';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/empreendimentos" element={
            <ProtectedRoute>
              <EmpreendimentosPage />
            </ProtectedRoute>
          } />
          <Route path="/empreendimentos/new" element={
            <ProtectedRoute>
              <EmpreendimentoForm />
            </ProtectedRoute>
          } />
          <Route path="/empreendimentos/:id/edit" element={
            <ProtectedRoute>
              <EmpreendimentoForm />
            </ProtectedRoute>
          } />

          <Route path="/empreendimentos/:empreendimentoId/unidades" element={
            <ProtectedRoute>
              <UnidadesPage />
            </ProtectedRoute>
          } />
          <Route path="/empreendimentos/:empreendimentoId/unidades/new" element={
            <ProtectedRoute>
              <UnidadeForm />
            </ProtectedRoute>
          } />
          <Route path="/empreendimentos/:empreendimentoId/unidades/:id/edit" element={
            <ProtectedRoute>
              <UnidadeForm />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/empreendimentos" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}