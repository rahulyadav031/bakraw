import React from 'react';
import Image from 'next/image'
import Home from '@/components/home'
import { Inter } from 'next/font/google'
import AOS from 'aos';
import 'aos/dist/aos.css';
const inter = Inter({ subsets: ['latin'] })
import Head from 'next/head';


export default function LandingPage() {
  React.useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="yvrQVdiL5h45SFnUQuxyn2X_O88sAQQZNTDYlksHCxQ" />
        <meta name="msvalidate.01" content="7E1F4FE16F0E89611E6AD1FB67638BBD" />
      </Head>
      <Home />
    </>
  )
}
