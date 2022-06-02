import 'dotenv/config';
import { text, relationship } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { cloudinaryImage } from '@keystone-6/cloudinary';


export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
    apiKey: process.env.CLOUDINARY_KEY as string,
    apiSecret: process.env.CLOUDINARY_SECRET as string,
    folder: 'notion',
};

export const TemplateImage = list({
    fields: {
        image: cloudinaryImage({
          cloudinary,
          label: 'Image',
        }),
        altText: text(),
        template: relationship({ ref: 'Template.images' }),
      },
    
})
