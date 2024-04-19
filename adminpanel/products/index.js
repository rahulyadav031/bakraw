import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminProducts from '@/components/admin/products/Products'

function products() {
  return (
    <AdminLayout title="Products">
        <AdminProducts/>
    </AdminLayout>
  )
}

export default products