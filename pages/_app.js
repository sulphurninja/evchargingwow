import { ThemeProvider } from '@/components/ThemeToggle/theme-provider'
import { DataProvider } from '@/store/GlobalState'
import '@/styles/globals.css'
import { DM_Sans } from 'next/font/google'

const dm = DM_Sans({ subsets: ['latin'] })


export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${dm.style.fontFamily};
        }
      `}</style>

      <DataProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Component {...pageProps} />
        </ThemeProvider>
      </DataProvider>
    </>
  )
}
