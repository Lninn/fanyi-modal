import { md5 } from './md5'

const BAIDU_URL =
  'https://fanyi-api.baidu.com/api/trans/vip/translate'
const APP_ID = import.meta.env
  .VITE_BAIDU_APP_ID
const KEY = import.meta.env
  .VITE_BAIDU_APP_KEY

export const createBaiduUrl = (
  q: any,
) => {
  const url = BAIDU_URL

  const salt = new Date().getTime()
  const sign = toSign(q, salt)

  const params = {
    q,
    from: 'en',
    to: 'zh',
    appid: APP_ID,
    salt,
    sign,
  }

  const finalUrl = append(url, params)

  return finalUrl
}

const toSign = (
  q: any,
  salt: number,
) => {
  const s = `${APP_ID}${q}${salt}${KEY}`

  return md5(s)
}

const append = (
  url: string,
  params: any,
) => {
  const qIdx = url.indexOf('?')
  if (qIdx === -1) {
    url = `${url}?`
  }

  return Object.keys(params).reduce(
    (accu, next, idx) => {
      const value = params[next]
      const preFix =
        idx === 0 ? '' : '&'

      accu += `${preFix}${next}=${value}`

      return accu
    },
    url,
  )
}
