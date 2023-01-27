import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/locale-switcher.module.scss";

const LocaleSwitcher = () => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  )

  return (
    <>
      {
        otherLocales.map((locale) => {
          const { pathname, query, asPath } = router
          return (
            <Link
              key={locale}
              href={{ pathname, query}}
              as={asPath}
              locale={locale}
              legacyBehavior
            >
              <button className={styles.button}>
                {locale}
              </button>
            </Link>
          )
        })
      }
    </>
  )
}

export default LocaleSwitcher;