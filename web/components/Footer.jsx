import styles from '../styles/footer.module.scss'
import Image from 'next/image';
import linkedin from '../public/linkedin.svg';
import github from '../public/github.svg';
import gmail from '../public/gmail.svg';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1>Let's work together</h1>
      <div>
        <Link href='https://www.linkedin.com/in/luis-eduardo-calder%C3%B3n-miranda/' target='_blank'>
          <Image 
            src={linkedin}
            alt='luis linkedin'
            className={styles.image}
          />
        </Link>
        <Link href='https://github.com/Wichosu' target='_blank'>
          <Image 
            src={github}
            alt='luis github'
            className={styles.image}
          />
        </Link>
        <Link href='mailto:luiscalderonmiranda@gmail.com'>
          <Image 
            src={gmail}
            alt='luis gmail'
            className={styles.image}
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
