import React from 'react'
import Customers from '@/components/admin/customers/Customers'
import AdminLayout from '@/components/admin/AdminLayout'

function cutomers() {
  return (
    <AdminLayout title="Customers">
        <Customers/>
    </AdminLayout>
  )
}

export default cutomers