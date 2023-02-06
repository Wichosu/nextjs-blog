import Link from 'next/link';
import groq from 'groq';
import client from '/lib/client';
import Image from 'next/image';
import profilePic from '../public/examen1.png'; //temp profile pic
import imageUrlBuilder from '@sanity/image-url';
import Arrow from '../public/Arrow.svg';
import styles from '../styles/index.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Index = ({posts}) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.index}>
      <div className={styles.title}>
        <h1>{t('title')}</h1>
        <h2>{t('subtitle')}</h2>
      </div>
      <div className={styles.hero}>
        <Image
          src={profilePic} 
          alt="Picture of Luis Eduardo Calderón Miranda"
          className={styles.image}
        />
        <div>
          <h3>Luis Eduardo Calderón Miranda (aka Wicho)</h3>
          <p>{t('about-me')}</p>
        </div>
      </div>
      {posts.length > 0 && 
        <div className={styles.cardContainer}>
        {
          posts.map(
          ({_id,
            title = '',
            author = '',
            categories = '',
            slug = '',
            mainImage = '', 
            publishedAt = '',
            description = '',
            url = '' }) => 
            slug && (
              <div 
                key={_id}
                className={styles.card}
              >
                <img 
                  src={urlFor(mainImage)} 
                  alt='Image of the project'
                />
                <div>
                  <h4>{author}</h4>
                  |
                  <p>{new Date(publishedAt).toDateString()}</p>
                </div>
                <Link 
                  href='/post/[slug]'
                  as={`/post/${slug.current}`}
                  className={styles.linkPost}
                >
                  {title}
                  <Image 
                    src={Arrow}
                    alt={`go to project: ${title}`}
                    className={styles.arrow}
                  />
                </Link>
                <p className={styles.description}>{description}</p>
                <ul>
                  {categories.map(category => <li key={category}>{category}</li>)}
                </ul>
                {url
                ? <Link href={url} target="_blank" className={styles.linkDeploy}>{t('deploy')}</Link>
                : <span>{t('no-deploy')}</span>
                }
              </div>
            )
          )
        }
        </div>
      }
    </div>
  )
}

export async function getStaticProps({ locale }){
  const standardQuery = groq`*[_type == "post" && publishedAt < now()]{
    _id,
    title,
    "author": author->name,
    mainImage,
    slug,
    publishedAt,
    "categories": categories[]->title,
    description,
    url
  } | order(publishedAt desc)`

  const translationQuery = groq`*[_type == "post-${locale}" && post->publishedAt < now()]{
    _id,
    title,
    "author": post->author->name,
    "mainImage": post->mainImage,
    "slug": post->slug,
    "publishedAt": post->publishedAt,
    "categories": post->categories[]->title,
    description,
    "url": post->url
  } | order(post->publishedAt desc)`

  let posts = {} 

  if(locale === 'en'){
    posts = await client.fetch(standardQuery)
  } else{
    posts = await client.fetch(translationQuery)
  }

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common'])),
    }
  }
}

export default Index;