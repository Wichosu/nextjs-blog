import Footer from "./Footer";
import styles from '../styles/layout.module.scss';
import LocaleSwitcher from "./Locale-switcher";

export default function Layout({children}){
  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <LocaleSwitcher />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}