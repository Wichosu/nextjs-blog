import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post-es',
  title: 'Post-es',
  type: 'document',
  fields: [
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: {type: 'post'},
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    })
  ],

  preview: {
    select: {
      title: 'title',
      author: 'post.author.name',
      media: 'post.mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})