import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedAdminRoute({ element }) {
  const { adminToken } = useContext(AuthContext);

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return element;
}
