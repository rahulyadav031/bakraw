import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  console.log(pageProps)
  return (
    <ThemeProvider attribute="class" defaultTheme='light'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
