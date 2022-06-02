import { list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';
import { createSlug } from '../lib/createSlug';
// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const Pricing = list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      slug: createSlug()
    },
    
  })

  