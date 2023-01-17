import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import Image from 'next/image';
import profilePic from '../public/examen1.png'; //temp profile pic
import imageUrlBuilder from '@sanity/image-url';
import styles from '../styles/index.module.scss';

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Index = ({posts}) => {
  return (
    <div className={styles.index}>
      <div className={styles.title}>
        <h1>Thoughts on my projects</h1>
        <h2>A personal sight on what I've developed</h2>
      </div>
      <div className={styles.hero}>
        <Image
          src={profilePic} 
          alt="Picture of Luis Eduardo Calderón Miranda"
          className={styles.image}
        />
        <div>
          <h3>Luis Eduardo Calderón Miranda (aka Wicho)</h3>
          <p>A web developer who tries to improve its skills by building tiny projects</p>
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
            description = '' }) => 
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
                  <h5>{author}</h5>
                  <p>{new Date(publishedAt).toDateString()}</p>
                </div>
                <Link 
                  href='/post/[slug]' 
                  as={`/post/${slug.current}`}
                  className={styles.link}
                >
                  {title}
                </Link>
                <p>{description}</p>
                <ul>
                  {categories.map(category => <li key={category}>{category}</li>)}
                </ul>
              </div>
            )
          )
        }
        </div>
      }
    </div>
  )
}

export async function getStaticProps(){
  const posts = await client.fetch(
    groq`*[_type == "post" && publishedAt < now()]{
      _id,
      title,
      "author": author->name,
      mainImage,
      slug,
      publishedAt,
      "categories": categories[]->title,
      description
    } | order(publishedAt desc)`
  )
  
  return {
    props: {
      posts
    }
  }
}

export default Index;