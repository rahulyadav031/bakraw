import React from 'react'
import OrderList from './orderList/OrderList';
import cookieCutter from "cookie-cutter"

function AdminOrders() {
  const [details, setDetails] = React.useState();

  const orderDetails = async () => {
    await fetch('/api/getorders', {
      method: "GET",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${cookieCutter.get('atkn')}`,
      },
    }).then(res => res.json())
      .then(res => {
        setDetails(res.orders);
      })
      .catch(err => console.log(err))
  }

  React.useEffect(() => {
    orderDetails();
    setInterval(() => {
      orderDetails();
    }, 60 * 1000)
  }, []);


  return (
    <div className=' min-h-screen w-full mx-auto pt-10 mb-5'>
      <div className=' bg-white dark:bg-gray-200 w-[95%] mx-auto mt-8'>
        <OrderList orders={details} />
      </div>
    </div>
  )
}

export default AdminOrders
