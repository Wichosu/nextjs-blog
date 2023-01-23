import '../styles/styles.scss';
import Layout from '../components/Layout';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }){
  return (
    <main className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}