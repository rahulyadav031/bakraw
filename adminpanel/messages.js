import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Messages from '@/components/admin/messages/Messages'

function messages() {
  return (
    <AdminLayout title="Messages">
        <Messages/>
    </AdminLayout>
  )
}

export default messages