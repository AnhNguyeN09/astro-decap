import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const homepage = defineCollection({
  loader: glob({ pattern: 'index.md', base: './src/content/homepage' }),
  schema: z.object({
    slides: z.array(z.object({
      pretitle: z.string(),
      title: z.string(),
      description: z.string(),
      image: z.string(),
      bgImage: z.string().optional(),
      btnPrimaryText: z.string().default('Kết nối'),
      btnPrimaryLink: z.string().default('/lien-he'),
      btnSecondaryText: z.string().default('Xem thêm'),
      btnSecondaryLink: z.string().default('#services'),
    })),
    about: z.object({
      heading: z.string(),
      subLabel: z.string(),
      content: z.string(),
      quote: z.string(),
      teamImage: z.string(),
    }),
    servicesSection: z.object({
      subTitle: z.string(),
      title: z.string(),
      desc: z.string(),
      items: z.array(z.object({
        icon: z.string(),
        tag: z.string(),
        title: z.string(),
        desc: z.string(),
      })),
    }),
    productsSection: z.object({
      subTitle: z.string(),
      title: z.string(),
      desc: z.string(),
      items: z.array(z.object({
        name: z.string(),
        badge: z.string(),
        tagline: z.string(),
        desc: z.string(),
        image: z.string(),
      })),
    }),
    callout: z.object({
      title: z.string(),
      desc: z.string(),
      phone: z.string(),
    }).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date().or(z.string()).optional(),
    category: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  homepage,
  blog,
};
