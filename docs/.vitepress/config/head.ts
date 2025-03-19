import type { HeadConfig } from 'vitepress'

export const createHead = (base: string) => {
  return [
    ['link', { rel: 'icon', href: base + 'favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', href: base + 'logo.png' }],
    ['meta', { name: 'msvalidate.01', content: '052AEF55670B1059AC662C78C693AED9' }],
    ['meta', { name: 'google-site-verification', content: 'h5ZDnqWDDdodHi5p5KY3IzNtALfigZTMXUZv1TRcSf0' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh' }],
    ['meta', { property: 'og:title', content: '唯知笔记 | 一个高效的知识分享网站' }],
    ['meta', { property: 'og:site_name', content: '唯知笔记' }],
    ['meta', { property: 'og:url', content: 'https://note.weizwz.com/' }],
  ] as HeadConfig[]
}