import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { ThemeProvider } from '@/components/ThemeToggle/theme-provider';
import { DataProvider } from '@/store/GlobalState';
import '@/styles/globals.css';
import { DM_Sans } from 'next/font/google';

const dm = DM_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    // Listen for route changes to trigger loading state
    const handleStart = () => startLoading();
    const handleComplete = () => stopLoading();
    const handleError = () => stopLoading();

    // Add event listeners
    window.addEventListener('routeChangeStart', handleStart);
    window.addEventListener('routeChangeComplete', handleComplete);
    window.addEventListener('routeChangeError', handleError);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('routeChangeStart', handleStart);
      window.removeEventListener('routeChangeComplete', handleComplete);
      window.removeEventListener('routeChangeError', handleError);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${dm.style.fontFamily};
        }
      `}</style>
      <DataProvider>
        {isLoading && <Loading />}
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
  );
}
