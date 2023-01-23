import client from '../../client';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import styles from '../../styles/post.module.scss';
import Image from 'next/image';
import Arrow from '../../public/Arrow.svg';

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
    title = 'Missing title', 
    name = 'Missing name', 
    categories,
    mainImage,
    body = []
  } = post

  return (
    <article className={styles.article}>
      <div className={styles.titleContainer}>
        <Link href='/'>
          <Image 
            src={Arrow} 
            alt='Go back'
            className={styles.arrow}
          />
        </Link>
        <div className={styles.title}>
          <h1>{title}</h1>
          <span>By {name}</span>
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

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  mainImage,
  body
}`

export async function getStaticPaths(){
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context){
  //It's important to default the Slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const post = await client.fetch(
    query,
    { slug }
  )

  return {
    props: {
      post
    }
  }
}

export default Post;