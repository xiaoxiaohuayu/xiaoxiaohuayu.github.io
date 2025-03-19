import { spawn, spawnSync } from "child_process"
import { statSync } from "fs"

/**
 * 获取源文件时间
 * @param filePath 
 * @returns 时间对象 { 创建时间， 修改时间 }
 */
export const getFileMetaTime = (filePath) => {
  const { birthtimeMs, mtimeMs } = statSync(filePath)
  return { birthtimeMs, mtimeMs }
}

/**
 * 读取git时间，同步
 * @param command git命令
 * @param cwd 文件目录
 * @returns git时间字符串
 */
export const getGitTimestampSync = (command, cwd) => {
  const result = spawnSync('git', command, { cwd })
  return result.stdout.toString().trim()
}

/**
 * 获取文章时间，异步
 * 没有git提交时间的话获取源文件创建和修改时间
 * @param filePath 
 * @returns Promise对象 resolve返回数组 [创建时间，最后一次修改时间]
 */
export const getGitTimestamp = (filePath: string) => {
  return new Promise<[number, number]>((resolve) => {
    let output: number[] = []

    // 开启子进程执行git log命令
    const child = spawn('git', ['--no-pager', 'log', '--follow', '--pretty="%ci"', filePath])

    // 监听输出流
    child.stdout.on('data', (d) => {
      const data = String(d)
        .split('\n')
        .map((item) => +new Date(item))
        .filter((item) => item)
      output.push(...data)
    })

    // 输出接受后返回
    child.on('close', () => {
      if (output.length) {
        // 返回[发布时间，最近更新时间]
        resolve([+new Date(output[output.length - 1]), +new Date(output[0])])
      } else {
        // 没有git提交记录时使用源文件时间
        const { birthtimeMs, mtimeMs } = getFileMetaTime(filePath)
        resolve([birthtimeMs, mtimeMs])
      }
    })

    // 进程错误
    child.on('error', () => {
      // 获取失败时使用源文件时间
      const { birthtimeMs, mtimeMs } = getFileMetaTime(filePath)
      resolve([birthtimeMs, mtimeMs])
    })
  })
}