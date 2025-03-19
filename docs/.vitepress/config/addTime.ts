import { formatDate, dateToUTC8 } from '../utils/tools'
import { getFileMetaTime, getGitTimestampSync } from '../utils/fileTime'

/**
 * 获取文件git提交时间，要求格式 yyyy-mm-dd hh:mm:ss+8:00
 * @param filePath 
 * @param cwd 
 * @returns 时间对象
 */
const getFileTimes = (filePath, cwd) => {
  let firstCommit = dateToUTC8(getGitTimestampSync(['log', '--reverse', '--diff-filter=A', '--pretty="%ai"', filePath], cwd))
  let lastUpdated = dateToUTC8(getGitTimestampSync(['log', '-1', '--pretty="%ai"', filePath], cwd))

  // 没有git提交时间的话获取源文件创建和修改时间
  if (!firstCommit && !lastUpdated) {
    const { birthtimeMs, mtimeMs } = getFileMetaTime(filePath)
    const dateOption = formatDate(true);

    firstCommit = dateToUTC8(dateOption.format(birthtimeMs))
    lastUpdated = dateToUTC8(dateOption.format(mtimeMs))
  }

  return {
    firstCommit,
    lastUpdated
  }
}

const addTime = (code, filePath) => {
  if (!code.match(/---\n([\s\S]*?)\n---/)) return code

  const frontmatter = code.match(/---\n([\s\S]*?)\n---/)[1]
  const hasFirstCommit = frontmatter.indexOf('firstCommit:') >= 0
  const hasLastUpdated = frontmatter.indexOf('lastUpdated:') >= 0

  if(hasFirstCommit && hasLastUpdated) return code

  const { firstCommit, lastUpdated } = getFileTimes(filePath, process.cwd())

  let addTime = `---\n`
  if (!hasFirstCommit) {
    addTime += `firstCommit: ${firstCommit}\n`
  }
  if (!hasLastUpdated) {
    addTime += `lastUpdated: ${lastUpdated}\n`
  }
  // 获取到时间后插入文章 frontmatter 内
  return code.replace('---\n', addTime)
}

export default addTime
