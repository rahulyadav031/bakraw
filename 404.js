import React from 'react'
import Link from 'next/link'
function Error() {
  return (
    <>
        <img src="/Error404/error4042.svg" alt="ErrorLogo" className='w-[30rem] h-[20rem] fixed bottom-0 right-0 -z-50'/>
        <div className='h-screen w-screen flex flex-col justify-center items-center sm:gap-[10rem] xs:gap-[5rem]'>
                <h1 className='md:text-4xl xs:text-xl text-primarybglight font-mono font-bold'>Oops! Page Does Not Exist...</h1>
                <Link href="/"><span className='md:text-2xl xs:text-md text-white font-medium md:p-5 xs:p-2 bg-primarybglight rounded-md'>Go to Home</span></Link>
        </div>
    </>
  )
}

export default Error