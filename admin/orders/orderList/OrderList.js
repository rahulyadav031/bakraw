import React from 'react'
import OrderCard from '../ordercard/OrderCard';

function OrderList({ orders }) {
  const [search, setSearch] = React.useState('');
  // console.log(orders);

  return (
    <div className='pb-2 text-black dark:text-slate-600'>
      <div className='sticky top-2 mx-2 md:mb-4 mb-20 z-10'>
        <input className='w-full sm:w-[300px] outline-none p-2 border-[1px] border-green-300 rounded-md tracking-wide font-medium' placeholder='Search Orders' onChange={(e) => setSearch(e.target.value)} />
      </div>
      {(search !== '') ?
        ((orders?.length !== 0) ? orders?.map((order, index) => {
          if (order.address.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || order.orderID.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || order.paymentID.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || order.address.phoneNumber1.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || order.address.location.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || order.address.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
            return (
              <OrderCard key={order.orderID} order={order} />
            )
          }
        }) :
          <div className='col-span-4 text-xl tracking-widest'>
            No Orders
          </div>)
        :
        ((orders?.length !== 0) ? orders?.map((order, index) => {
          return (
            <OrderCard key={order.orderID} order={order} />
          )
        }) :
          <div className='col-span-4 text-xl tracking-widest'>
            No Orders
          </div>)}

    </div>
  )
}

export default OrderList
