import client from '/lib/client';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import styles from '../../styles/post.module.scss';
import Image from 'next/image';
import Arrow from '../../public/Arrow.svg';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if(!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ''}
          loading='lazy'
          src={urlFor(value).width(320).height(240).fit('max').auto('format')}
        />
      )
    }
  }
}

const Post = ({post}) => {
  const  { 
    title = 'No Title', 
    name = 'No Author', 
    categories = '',
    mainImage = 'No Image',
    body = [],
    url
  } = post

  const { t } = useTranslation('common')

  return (
    <article className={styles.article}>
      <div>
        <div className={styles.title}>
          <Link href='/' className={styles.arrowContainer}>
            <Image 
              src={Arrow} 
              alt='Go back'
              className={styles.arrow}
            />
          </Link>
          <h1>{title}</h1>
          <span>{t('by')} {name}</span>
          {url
          ? <Link href={url} target="_blank" className={styles.link}>{t('deploy')}</Link>
          : <span>{t('no-deploy')}</span>
          }
        </div>
      </div>
      <div className={styles.hero}>
        {categories && (
          <ul>
            {categories.map(category => <li key={category}>{category}</li>)}
          </ul>
        )}
        {mainImage && (
          <img
            src={urlFor(mainImage)
              .width(50)
              .url()}
            alt={`project's picture`}
          />
        )}
      </div>
      <PortableText
        value={body}
        components={ptComponents}
      />
    </article>
  )
}

export async function getStaticPaths(){
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: false,
  }
}

export async function getStaticProps(context){
  const standardQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "categories": categories[]->title,
    mainImage,
    body,
    url
  }`

  const translationQuery = groq`*[_type == "post-${context.locale}" && post->slug.current == $slug][0]{
    title,
    "name": post->author->name,
    "categories": post->categories[]->title,
    "mainImage": post->mainImage,
    body,
    "url": post->url
  }`

  //It's important to default the Slug so that it doesn't return "undefined"
  const { slug = '' } = context.params
  let post = ''
  if(context.locale === 'en'){
    post = await client.fetch(standardQuery, {slug})
  } else {
    post = await client.fetch(translationQuery, {slug})
  }

  return {
    props: {
      post,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  }
}

export default Post;