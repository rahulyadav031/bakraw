import React from 'react'
import Dashboard from '@/components/admin/dashboard/Dashboard'
import AdminLayout from '@/components/admin/AdminLayout'

function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <Dashboard/>
    </AdminLayout>
  )
}

export default AdminDashboard