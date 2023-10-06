import '@/styles/global.sass';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Header />
    <main><Component {...pageProps} /></main>
    <Toaster />
  </>;
}
