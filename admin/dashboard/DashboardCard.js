import React from 'react'
import { useRouter } from 'next/router'

function DashboardCard({ image, name, data, bgcolor, link }) {
  const router = useRouter();
  return (
    <div className={`flex flex-row justify-center items-center gap-3 p-3 rounded-md bg-green-300 cursor-pointer shadow-md shadow-green-500/50 select-none`} onClick={() => router.push(link)}>
      <img src={image} className='w-[60px] h-[60px]' />
      <span className='text-xl font-normal'>Total {name} - {data}</span>
    </div>
  )
}

export default DashboardCard