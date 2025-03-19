/**
 * 文字统计
 * @param data 字符串
 * @returns 字符串长度
 */
export const countWord = (data: string) => {
  const pattern =
    /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g
  const m = data.match(pattern)
  let count = 0
  if (!m) {
    return count
  }
  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length
    } else {
      count += 1
    }
  }
  return count
}

/**
 * 计算字符串长度, 汉字算1.5个字符
 * @param str 字符串
 * @returns 长度
 */
export const calculateStrLength = (str) => {
  let length = 0

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    // 判断是否为汉字（Unicode范围）
    if (charCode >= 0x4e00 && charCode <= 0x9fff) {
      length += 1.5
    } else {
      // 非汉字字符，包括英文字母、数字、英文标点等
      length += 1
    }
  }

  return length
}

/**
 * 截取字符串, 汉字算1.5个字符
 * @param str
 * @param maxLength
 * @returns
 */
export const truncateStr = (str, maxLength) => {
  let result = ''
  let currentLength = 0

  for (let char of str) {
    const charCode = char.charCodeAt(0)
    const charWeight = charCode >= 0x4e00 && charCode <= 0x9fff ? 1.5 : 1

    if (currentLength + charWeight > maxLength) break

    result += char
    currentLength += charWeight
  }

  return result
}

/**
 * 数字千分位转换 1500 -> 1.5k，1500000 -> 1.5M
 * @param count
 * @returns
 */
export const countTransK = (count: number) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

/**
 * 生成随机颜色 hsl
 * @returns 颜色
 */
export const randomColor = () => {
  return (
    'hsl(' +
    Math.round(Math.random() * 360) +
    ',' +
    Math.round(Math.random() * 100) +
    '%,' +
    Math.round(Math.random() * 80) +
    '%)'
  )
}

/**
 * 日期格式化程序
 * @param hasTime 是否包含时间
 * @returns
 */
export const formatDate = (hasTime?: boolean) => {
  let formatOption = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  if (hasTime) {
    Object.assign(formatOption, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }
  return new Intl.DateTimeFormat('zh', formatOption as Intl.DateTimeFormatOptions)
}

/**
 * 将日期字符串转换为东八区日期字符串
 * @param date 日期字符串
 * @returns
 */
export const dateToUTC8 = (date: string) => {
  let utcDate = date.replace(/\//g, '-')
  utcDate =
    utcDate.indexOf('+0800') >= 0 || utcDate.indexOf('+8:00') >= 0
      ? utcDate.replace(' +0800', '+8:00')
      : utcDate + '+8:00'
  return utcDate
}

/**
 * 获取数组中随机元素，数组为空 返回`undefined`.
 * @param {T[]} arr - 数组
 * @returns {T | undefined} - 返回值
 */
export const getRandomElement = (arr) => {
  return arr.length === 0 ? undefined : arr[Math.floor(Math.random() * arr.length)]
}
