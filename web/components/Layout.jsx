import Footer from "./Footer";
import styles from '../styles/layout.module.scss';

export default function Layout({children}){
  return (
    <div className={styles.layout}>
      <main>{children}</main>
      <Footer />
    </div>
  )
}