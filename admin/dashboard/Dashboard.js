import React from 'react';
import cookieCutter from "cookie-cutter";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
// import DashboardCard from './DashboardCard';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function Dashboard() {

  const [datas, setDatas] = React.useState({
    users: 0,
    products: 0,
    orders: 0,
    messages: 0
  })

  React.useEffect(() => {
    fetch('/api/getstats',{
      method: "GET",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${cookieCutter.get('atkn')}`
      }
    }).then(res => res.json()).then(data => {
      setDatas(data);
    }).catch(err => console.log(err));
  }, []);




  React.useEffect(() => {
  }, []);



  function renderChart() {
    const data = {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      labels: Object.keys(datas),
      datasets: [
        {
          label: '# Customer Info',
          data: Object.values(datas),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(100, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return <PolarArea data={data} className="m-auto w-full h-full max-w-[500px] max-h-[500px]" />;
  }


  return (
    <div className='w-min-full min-h-screen flex flex-col justify-center'>
      {
        renderChart()
      }
      {/* <div className="grid grid-cols-1 md:grid-cols-2 place-items-center w-min-full h-min-[100vh] bg-red">
        <DashboardCard name="Customers" image="/admin/customers.png" bgcolor="red" link="/adminpanel/customers" data={datas.customers} />
        <DashboardCard name="Orders" image="/admin/order.png" bgcolor="red" link="/adminpanel/orders" data={datas.orders} />
        <DashboardCard name="Products" image="/admin/products.png" bgcolor="red" link="/adminpanel/products" data={datas.products} />
        <DashboardCard name="Messages" image="/admin/messages.png" bgcolor="red" link="/adminpanel/messages" data={datas.messages} />
      </div> */}
    </div>
  )
}

export default Dashboard