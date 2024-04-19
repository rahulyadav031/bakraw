import Link from 'next/link'
import React from 'react'

function OrderDetails({ item }) {
  return (
    <div className='flex-col m-2 border-1 bg-white p-4 rounded-md border-slate-500'>
      <p>Product ID: <Link href={`/product/${item.id}`} className=' text-green-500'>{item.id}</Link></p>
      <p>Name: {item.name}</p>
      <p>Weight: {item.weight}</p>
      <p>Quantity: {item.quantity}</p>
      <p>BasePrice: {item.basePrice}</p>
      <p>TotalAmount: {item.total}</p>
    </div>
  )
}

export default OrderDetails
