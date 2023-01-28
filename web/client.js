import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'f6kuvck3',
  dataset: 'production',
  apiVersion: '2023-01-27',
  useCdn: true //false if you want to ensure fresh data
})