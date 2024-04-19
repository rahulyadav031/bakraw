import React from 'react'
import { UserIcon, BuildingOfficeIcon, MapPinIcon, ChevronDoubleDownIcon, CurrencyRupeeIcon, CalendarIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import Button from '../button/Button';
import OrderDetails from '../orderDetails/OrderDetails';
import cookieCutter from "cookie-cutter";
import Loader from '../../Common/Loader';

function OrderCard({ order }) {
  const [show, setshow] = React.useState(false);
  const { address, delivered, loggedInNumber, paymentMode, items, orderID, time, totalAmount, paymentID, uid } = order;
  const [deliveryStatus, setDeliveryStatus] = React.useState(delivered);
  const [finalDeliveryStatus, setFinalDeliveryStatus] = React.useState(delivered)
  const [loading, setLoading] = React.useState(false)

  const showDetails = (e) => {
    setshow(e);
  }

  const saveDeliveryStatus = () => {
    setLoading(true);
    console.log(deliveryStatus)
    if (deliveryStatus !== "Order is being prepared...") {
      setFinalDeliveryStatus(deliveryStatus);
      fetch('/api/updateorderstatus', {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authorization': `Bearer ${cookieCutter.get('atkn')}`
        },
        body: JSON.stringify({
          uid: uid,
          orderID: orderID,
          delivered: deliveryStatus
        })
      }).then(res => res.json()).then(data => {
        console.log(data);
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      })
    }
  }

  return (
    <>
      <div className='p-6 bg-slate-100 m-2 rounded-md hover:shadow-lg shadow-black mb-4' >
        <div className='relative flex flex-wrap items-center '>
          <div className='flex-col m-2'>
            <p className=' text-lg font-semibold text-slate-600'>#{orderID} </p>
            {/* {paymentMode ==="cash on delivery" ?"":<p className=' text-lg font-semibold text-slate-600'>PaymentID: {paymentID} </p>} */}
          </div>
          <div className='flex items-center font-medium text-xl tracking-wider'>
            <UserIcon className='w-[20px] h-[20px] mx-2 text-green-600' />
            <p>{address.firstName.toUpperCase()} {address.lastName.toUpperCase()} <span className='text-sm font-light'>({loggedInNumber})</span></p>
          </div>
          <div className='ml-5'>
            {(finalDeliveryStatus !== "Order is being prepared...") ?
              <Button delivered={deliveryStatus} /> :
              !loading ? <div className='flex flex-row items-center justify-center gap-3'>
                <select onChange={(e) => setDeliveryStatus(e.target.value)} className='p-2 rounded-md cursor-pointer'>
                  <option value=''>Order is being prepared...</option>
                  <option value='Delivered'>Delivered</option>
                  <option value='Cancelled'>Cancel</option>
                </select>
                <span className='px-3 py-2 text-white bg-blue-500 cursor-pointer rounded-md' onClick={() => saveDeliveryStatus()}>Save</span>
              </div> :
              <Button delivered={deliveryStatus}/>
            }
          </div>
        </div>
        <hr className='mt-3 w-full   border-slate-300' />
        <div className='relative flex flex-wrap items-center'>
          <div className='flex items-center font-normal text-sm m-3'>
            <BuildingOfficeIcon className='w-[18px] h-[18px] mr-1 text-green-600' />
            <p>{address.location}</p>
          </div>
          <div className='flex items-center font-normal text-sm m-3'>
            <MapPinIcon className='w-[18px] h-[18px] mr-2 text-green-600' />
            <p>{address.pin}</p>
          </div>
          <div className='flex items-center font-normal text-sm m-3'>
            <CurrencyRupeeIcon className='w-[18px] h-[18px] mr-2 text-green-600' />
            <p>{totalAmount} {paymentMode === "cash on delivery" ? "cash on delivery" : `paid- ${paymentID} `}</p>
          </div>
          <div className='flex items-center font-normal text-sm m-3'>
            <CalendarIcon className='w-[18px] h-[18px] mr-2 text-green-600' />
            <p>{time}</p>
          </div>
          <div className='flex items-center font-normal text-sm m-3'>
            <PhoneIcon className='w-[18px] h-[18px] mr-2 text-green-600' />
            <p>{address.phoneNumber1} {address.phoneNumber2 && address.phoneNumber2}</p>
          </div>
          <div className='flex items-center font-normal text-sm m-3'>
            <EnvelopeIcon className='w-[18px] h-[18px] mr-2 text-green-600' />
            <p>{address.email}</p>
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
