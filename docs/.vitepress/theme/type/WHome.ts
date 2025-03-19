export interface HomeMenu {
  // 标题
  title: string
  // 链接
  link: string
  // 图标名称
  iconName: string
}

export interface HomeAbout {
  // 站点名称
  title: string
  // logo
  logo: string
  // 站点描述
  desc: string
  // 站点口号
  tagline: string
  // 站点链接
  links: HomeMenu[]
}

export interface HomePost {
  // 标题
  title: string
  // 类型
  type?: 'post' | 'card' | 'busuanzi' | 'more'
  // 链接
  url?: string
  // 摘要
  abstract?: string
  // 日期：创建日期，更新日期
  date?: [number, number]
   // 日期文本
  dateText?: [string, string]
  // 标签名称
  tags?: string[]
}

export interface HomePostStatistic {
  // 文章数量
  number: number
  // 描述
  desc: string
}