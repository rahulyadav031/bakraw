import React from 'react'
import OrderCard from '../ordercard/OrderCard';

function OrderList({ orders }) {
  console.log(orders);

  return (
    <div className='pb-2 text-black dark:text-slate-600'>
      {orders?.map((order, index) => {
        return (
          <OrderCard key={index} order={order} />
        )
      })}

    </div>
  )
}

export default OrderList
