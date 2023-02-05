import '../styles/styles.scss';
import Layout from '../components/Layout';
import { Inter } from '@next/font/google';
import { appWithTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const inter = Inter({ subsets: ['latin'] })

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export async function getStaticProps({locale}){
  return{
    props:{
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export default appWithTranslation(MyApp);