
import React from 'react'
import Layout from '../Layout'
import OrderList from './orderList/OrderList'
import cookieCutter from "cookie-cutter"
import { useRouter } from 'next/router'

function Orders() {
  const router = useRouter();
  const [details, setDetails] = React.useState(null);
  const orderDetails = async () => {
    await fetch('/api/getorderdetails', {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': `Bearer ${cookieCutter.get('userToken')}`,
        },
    }).then(res => res.json())
        .then(res => {
            setDetails(res.data);
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
    <Layout title="orders">
      <div className=' min-h-screen w-full mx-auto pt-10 mb-5'>
        {(details) ? <div className=' bg-white dark:bg-gray-200 w-[95%] mx-auto mt-8'>
          <div className=' bg-slate-300 dark:bg-slate-800 p-10 text-2xl font-semibold mb-8'>My Orders</div>
          <OrderList orders={details} />
        </div> : 
        <div className='w-[95%] h-screen flex items-center justify-center mx-auto mt-8'>
          <h2 className='text-2xl'>No Orders Yet! Try our awesome products <span className='bg-green-500 text-slate-100 px-3 py-1 rounded-md cursor-pointer' onClick={() => router.push("/products")}>here</span></h2>
        </div>}
      </div>
    </Layout>
  )
}

export default Orders