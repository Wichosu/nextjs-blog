import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'f6kuvck3',
  dataset: 'production',
  useCdn: true //false if you want to ensure fresh data
})