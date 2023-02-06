import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '/schemas'

export default defineConfig({
  name: 'default',
  title: 'nextjs-sanity-blog',
  basePath: '/studio',

  projectId: 'f6kuvck3',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})