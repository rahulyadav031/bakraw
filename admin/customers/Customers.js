import React from 'react'
import cookieCutter from "cookie-cutter"
import ResponsiveTable from '../Common/ResponsiveTable'
import EmptyCart from '@/components/cart/EmptyCart';

function Customers() {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/admingetcustomers', {
      method: "GET",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${cookieCutter.get('atkn')}`
      }
    }).
      then(res => res.json()).
      then(data => setUserData(data.data)).
      catch(e => setUserData(null))

  }, [])

  const User = ({ uid, lastSignInTime, phoneNumber, creationTime, className }) => {
    return (
      <div className={`grid grid-cols-4 place-items-center p-2 bg-slate-50 ${className ? className : 'text-sm'}`}>
        <p>{phoneNumber}</p>
        <p>{uid}</p>
        <p>{creationTime}</p>
        <p>{lastSignInTime}</p>
      </div>
    )
  }


  function processTable() {
    let table = {
      head: ['UID', 'Phone Number', 'Creation Time', 'Last Log In'],
      body: [],
    };

    (userData && userData)?.map((doc) => {
      table.body.push([doc.data.uid, doc.data.phoneNumber, doc.data.creationTime, doc.data.lastSignInTime]);
    });


    // // Enable This For Test
    // let table = {
    //     head: ['UID', 'Phone Number', 'Creation Time', 'Last Log In'],
    //   body: [
    //     ['shagdaskd', '7212756239832', '16/08/5254','12/23/3213'],
    //     ['dhaisdbaksd', '0934858', '16/08/5254','12/23/3213'],
    //     ['dhaisjdsadnasknd', '789374294', '16/08/5254','12/23/3213'],
    //     ['adiufhaiudhn', '68273462873', '16/08/5254','12/23/3213'],
    //     ['jasjdn', '236486234', '16/08/5254','12/23/3213'],
    //     ['duhfiafnkd', '389432u', '16/08/5254','12/23/3213'],
    //     ['shagdaskd', '7212756239832', '16/08/5254','12/23/3213'],
    //     ['dhaisdbaksd', '0934858', '16/08/5254','12/23/3213'],
    //     ['dhaisjdsadnasknd', '789374294', '16/08/5254','12/23/3213'],
    //     ['adiufhaiudhn', '68273462873', '16/08/5254','12/23/3213'],
    //     ['jasjdn', '236486234', '16/08/5254','12/23/3213'],
    //     ['duhfiafnkd', '389432u', '16/08/5254','12/23/3213'],
    //     ['shagdaskd', '7212756239832', '16/08/5254','12/23/3213'],
    //     ['dhaisdbaksd', '0934858', '16/08/5254','12/23/3213'],
    //     ['dhaisjdsadnasknd', '789374294', '16/08/5254','12/23/3213'],
    //     ['adiufhaiudhn', '68273462873', '16/08/5254','12/23/3213'],
    //     ['jasjdn', '236486234', '16/08/5254','12/23/3213'],
    //     ['duhfiafnkd', '389432u', '16/08/5254','12/23/3213'],
    //   ]
    // };
    return (
      table.body.length == 0
        ?
        <EmptyCart text="No Records Found" forceLight={true} />
        :
        <ResponsiveTable head={table.head} body={table.body} />
    );
  }


  return (
    <div className='w-full'>
      {
        processTable()
      }
    </div>
  )
}

export default Customers