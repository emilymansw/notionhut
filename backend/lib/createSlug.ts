import slugify from 'slugify';
import { text } from '@keystone-6/core/fields';

export const slugifyStr = (str: string) =>
  slugify(str.trim().toLowerCase(), {
    remove: /[?*+~.()',"!:@{}/\\]/g,
  });

  export const createSlug = () => 
    text({
        label: 'Slug',
        hooks: {
          resolveInput: ({ inputData, fieldKey, operation }) => {
            if (operation === 'create' && !inputData[fieldKey]) {
              return `${slugifyStr(inputData.name)}`;
            }
            return inputData[fieldKey];
          },
        },
        ui: { createView: { fieldMode: 'hidden' } },
        isIndexed: true,
      })
  