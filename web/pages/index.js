import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import Image from 'next/image';
import profilePic from '../public/examen1.png'; //temp profile pic
import imageUrlBuilder from '@sanity/image-url';
import Footer from '../components/Footer';

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Index = ({posts}) => {
  return (
    <div>
      <h1>Thoughts on my projects</h1>
      <h2>A personal sight on what I've developed</h2>
      <div>
        <Image
          src={profilePic} 
          alt="Picture of Luis Eduardo Calderón Miranda"
        />
        <h3>Luis Eduardo Calderón Miranda (aka Wicho)</h3>
        <p>A web developer who tries to improve its skills by building tiny projects</p>
      </div>
      {posts.length > 0 && posts.map(
        ({ _id, title = '', author = '', categories = '', slug = '', mainImage = '', publishedAt = '' }) => 
          slug && (
            <div key={_id}>
              <img 
                src={urlFor(mainImage)} 
                alt='Image of the project'
              />
              <div>
                <p>{author}</p>
                <p>{new Date(publishedAt).toDateString()}</p>
              </div>
              <Link href='/post/[slug]' as={`/post/${slug.current}`}>
                {title}
              </Link>
              {/*Missing description*/}
              <ul>
                {categories.map(category => <li key={category}>{category}</li>)}
              </ul>
            </div>
          )
      )}
      <Footer />
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
      "categories": categories[]->title
    } | order(publishedAt desc)`
  )
  
  return {
    props: {
      posts
    }
  }
}

export default Index;