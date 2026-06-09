import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://luraloop.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://luraloop.com/deployment/register',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }
  ]
}
