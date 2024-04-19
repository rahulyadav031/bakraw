import React from 'react'
import { UserIcon, BuildingOfficeIcon, MapPinIcon, ChevronDoubleDownIcon, CurrencyRupeeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Button from '../button/Button';
import OrderDetails from '../orderDetails/OrderDetails';

function OrderCard({ order }) {
  const [show, setshow] = React.useState(false);
  const showDetails = (e) => {
    setshow(e);
  }
  const { address, delivered, loggedInNumber, paymentMode, items, orderID, time, totalAmount, paymentID } = order;
  return (
    <>
      <div className='p-6 bg-slate-100 dark:bg-gray-500 m-2 rounded-md hover:shadow-lg shadow-black mb-4 text-gray-800 dark:text-slate-200' >
        <div className='relative flex flex-wrap items-center gap-2'>
          <div className='flex items-center font-semibold text-lg'>
            <UserIcon className='w-[20px] h-[20px] mx-2' />
            <p>{address.firstName.toUpperCase()} {address.lastName.toUpperCase()}</p>
          </div>
          <div className='flex-col m-2'>
            <p className=' text-sm font-light text-slate-600 dark:text-slate-300'>#{orderID} </p>
            {/* {paymentMode ==="cash on delivery" ?"":<p className=' text-lg font-semibold text-slate-600'>PaymentID: {paymentID} </p>} */}
          </div>
          <Button delivered={delivered} />
        </div>
        <hr className='mt-3 w-full   border-slate-300' />
        <div className='relative flex flex-wrap items-center'>
          <div className='flex items-center font-normal text-sm m-3'>
            <BuildingOfficeIcon className='w-[18px] h-[18px] mr-1' />
            <p>{address.location}</p>
          </div>
          <div className='flex items-center font-normal text-sm m-3'>
            <MapPinIcon className='w-[18px] h-[18px] mr-2' />
            <p>{address.pin}</p>
          </div>
          <div className='flex items-center font-normal text-sm m-3'>
            <CurrencyRupeeIcon className='w-[18px] h-[18px] mr-2' />
            <p>{totalAmount} {paymentMode === "cash on delivery" ? "cash on delivery" : `paid- ${paymentID} `}</p>
          </div>
          <div className='flex items-center font-normal text-sm m-3'>
            <CalendarIcon className='w-[18px] h-[18px] mr-2' />
            <p>{time}</p>
          </div>
          <ChevronDoubleDownIcon onClick={() => showDetails(!show)} className=' w-[25px] h-[25px] mt-2 ml-auto animate-bounce cursor-pointer' />
        </div>
      </div>
      {show ?
        <div className='flex-col m-2 p-4 bg-slate-100 rounded-md'>
          <span className=' text-2xl font-semibold text-slate-500 my-5'>Orders: </span>
          <div className=' grid grid-cols-1 md:grid-cols-2 gap-2'>
            {
              items.map((item, index) => {
                return (
                  <OrderDetails key={index} item={item} />
                )
              })
            }
          </div>

        </div> : ""}
    </>

  )
}

export default OrderCard;
