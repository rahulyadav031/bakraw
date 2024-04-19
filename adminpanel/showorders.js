import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminOrders from '@/components/admin/orders/Orders'

function orders() {
  return (
    <AdminLayout title="Orders">
        <AdminOrders/>
    </AdminLayout>
  )
}

export default orders