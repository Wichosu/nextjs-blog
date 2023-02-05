import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { createClient, groq } from 'next-sanity'
import { parseBody } from 'next-sanity/webhook'

export { config } from 'next-sanity/webhook'

export default async function revalidate(req, res) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )
    if (isValidSignature === false) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (typeof body._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    const staleRoutes = await queryStaleRoutes(body)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

async function queryStaleRoutes(body){
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  // Handle possible deletions
  if (body._type === 'post') {
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id })
    if (!exists) {
      let staleRoutes = ['/']
      if (body.slug?.current) {
        staleRoutes.push(`/posts/${body.slug.current}`)
      }
      // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
      const moreStories = await client.fetch(
        groq`count(
          *[_type == "post"] | order(date desc, _updatedAt desc) [0...3] [dateTime(date) > dateTime($date)]
        )`,
        { date: body.date }
      )
      // If there's less than 3 posts with a newer date, we need to revalidate everything
      if (moreStories < 3) {
        return [...new Set([...(await queryAllRoutes(client)), ...staleRoutes])]
      }
      return staleRoutes
    }
  }

  switch (body._type) {
    case 'author':
      return await queryStaleAuthorRoutes(client, body._id)
    case 'post':
      return await queryStalePostRoutes(client, body._id)
    case 'settings':
      return await queryAllRoutes(client)
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

async function _queryAllRoutes(client){
  return await client.fetch(groq`*[_type == "post"].slug.current`)
}

async function queryAllRoutes(client){
  const slugs = await _queryAllRoutes(client)

  return ['/', ...slugs.map((slug) => `/posts/${slug}`)]
}

async function mergeWithMoreStories(client, slugs){
  const moreStories = await client.fetch(
    groq`*[_type == "post"] | order(date desc, _updatedAt desc) [0...3].slug.current`
  )
  if (slugs.some((slug) => moreStories.includes(slug))) {
    const allSlugs = await _queryAllRoutes(client)
    return [...new Set([...slugs, ...allSlugs])]
  }

  return slugs
}

async function queryStaleAuthorRoutes(client, id){
  let slugs = await client.fetch(
    groq`*[_type == "author" && _id == $id] {
    "slug": *[_type == "post" && references(^._id)].slug.current
  }["slug"][]`,
    { id }
  )

  if (slugs.length > 0) {
    slugs = await mergeWithMoreStories(client, slugs)
    return ['/', ...slugs.map((slug) => `/posts/${slug}`)]
  }

  return []
}

async function queryStalePostRoutes(client, id){
  let slugs = await client.fetch(
    groq`*[_type == "post" && _id == $id].slug.current`,
    { id }
  )

  slugs = await mergeWithMoreStories(client, slugs)

  return ['/', ...slugs.map((slug) => `/posts/${slug}`)]
}