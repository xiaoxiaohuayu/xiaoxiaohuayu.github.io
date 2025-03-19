import { createContentLoader } from 'vitepress'
import { basename, extname, sep, normalize } from 'path'
import { formatDate } from './tools'
import { getGitTimestamp } from './fileTime'

export interface Post {
  title: string // 标题
  url: string // url
  date: [number, number] // 日期：创建日期，更新日期
  dateText: [string, string] // 日期文本
  abstract: string // 摘要
  tags?: string[] | undefined // 标签
}
export type Year = {
  [key: string]: Post[]
}
export type Tag = {
  [key: string]: Post[]
}

export interface Data {
  posts: Post[]
  years: Year
  tags: Tag
}

// 避免导入时报错
declare const data: Data
export { data }

// 获取并处理所有文档数据，供首页、全部文章等使用
// https://vitepress.dev/zh/guide/data-loading#createcontentloader
export default createContentLoader(
  [
    'post/**/!(*-demo).md' // 也可用过滤 "!(.vitepress|public|pages)/**/!(index|README).md", 过滤掉示例文档/非正式文档，以 -demo 为结尾
  ],
  {
    // 包含原始 markdown 源
    includeSrc: false,
    // 包含摘录
    excerpt: false,
    async transform(data) {
      const promises: Promise<any>[] = []
      let posts: Post[] = []
      let years: Year = {}
      let tags: Tag = {}

      data.forEach(({ frontmatter, src, url }) => {
        // 优先取frontmatter里的标题，没有的话再去找源文中的标题
        let title = frontmatter.title
        /** includeSrc=true才生效
        if (!title) {
          title = src?.match(/^\s*#\s+(.*)\s*$/m)?.[1] || basename(url).replace(extname(url), '')
          // 标题可能用到了变量，需要替换
          const regexp = /\{\{\s*\$frontmatter\.(\S+?)\s*\}\}/g
          let match
          while ((match = regexp.exec(title)) !== null) {
            const replaceReg = new RegExp('\\{\\{\\s*\\$frontmatter\\.' + match[1] + '\\s*\\}\\}', 'g')
            title = title.replace(replaceReg, frontmatter[match[1]])
          }
        }
        */
        let _tags = frontmatter?.tags
        let abstract = frontmatter?.description
        // 获取手动设置的更新时间
        const createdDate = frontmatter?.firstCommit ? +new Date(frontmatter.firstCommit) : ''
        const updatedDate = frontmatter?.lastUpdated ? +new Date(frontmatter.lastUpdated) : ''
        // 日期格式
        const dateOption = formatDate();

        // 链接去掉项目名
        const link = normalize(url)
          .split(sep)
          .filter((item) => item)
          .join(sep)
        // https://vitepress.dev/zh/guide/getting-started#file-structure
        // 如果你的文档在docs目录下，路径开头需要拼接 docs/ ，末尾需要拼接 .md
        const task = getGitTimestamp('docs/' + link.replace(/.html/, '') + '.md').then((date) => ({
          title,
          url: link.replace(/post\//, ''), // 由于使用了rewrites重定向，这里也对url作处理
          date: [createdDate || date[0], updatedDate || date[1]],
          dateText: [
            createdDate
              ? dateOption.format(createdDate)
              : dateOption.format(date[0]),
            updatedDate
              ? dateOption.format(updatedDate)
              : dateOption.format(date[1]),
          ],
          abstract: abstract,
          /** includeSrc=true才生效
            || src
            // 去除html标签
            ?.replace(/<[^>]+?>/g, '')
            // 去除frontmatter
            .replace(/^---[\s\S]*?---/, '')
            // 去除标题
            .replace(/^#+\s+.*?$/gm, '')
            // 去除引用
            .replace(/^\>/gm, '')
            // 只保留反引号内部内容
            .replace(/`(.+?)`/g, '$1')
            // 只保留加粗、倾斜符号中的内容
            .replace(/\*{1,3}(.+?)\*{1,3}/g, '$1')
            // 只保留跳转内容
            .replace(/\[(.+?)\]\(.+?\)/g, '$1')
            // 去除提示块
            .replace(/^:::.*$/gm, '')
            // 一个或多个空白字符统一替换为一个空格
            .replace(/\s+/g, ' ')
            // 去除首尾空格
            .trim()
            // 仅保留可能显示的部分，减小数据大小
            .slice(0, 200),
          */
          tags: _tags
        }))
        promises.push(task)
      })

      const pages = await Promise.all(promises)

      // 固定文章从最早发布日期开始，以便标签数组能稳定显示（不会因为新发布文章而导致顺序变化）
      const fixPages = pages.sort((a, b) => a.date[0] - b.date[0])
      let tagNames: string[] = []
      fixPages.forEach((item) => {
        item.tags.forEach((tag) => {
          if (tagNames.indexOf(tag) == -1) {
            tagNames.push(tag)
            tags[tag] = []
          }
        })
      })

      // 发布时间降序排列
      posts = pages.sort((a, b) => b.date[0] - a.date[0])
      // 更新时间降序排列
      // posts = pages.sort((a, b) => b.date[1] - a.date[1])

      posts.forEach((item) => {
        // 根据标签归类文章
        if (item.tags) {
          item.tags.forEach((tag) => {
            tags[tag].push(item)
          })
        }
        // 年份排列，以便显示全部文章
        const year = new Date(item.date[0]).getFullYear()
        if (!years[year]) {
          years[year] = []
        }
        years[year].push(item)
      })

      return {
        posts,
        years,
        tags
      }
    }
  }
)
