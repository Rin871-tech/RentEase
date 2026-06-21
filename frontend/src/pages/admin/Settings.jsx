import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import ProtectedAdminRoute from '../../components/ProtectedAdminRoute';

function SettingsContent() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>

        <div className="card p-12 text-center">
          <p className="text-4xl mb-3">⚙️</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Coming Soon</h2>
          <p className="text-slate-600">Settings page is coming in the next phase.</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function Settings() {
  return <ProtectedAdminRoute element={<SettingsContent />} />;
}
