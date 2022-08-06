import { md5 } from './utils'


const BAIDU_URL = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
const APP_ID = process.env.BAIDU_APP_ID
const KEY = process.env.BAIDU_APP_KEY

export const createTranslateUrl = (q) => {
  const url = BAIDU_URL

  const salt = (new Date).getTime()
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

const toSign = (q, salt) => {
  const s = `${APP_ID}${q}${salt}${KEY}`

  return md5(s)
}

const append = (url, params) => {
  const qIdx = url.indexOf('?')
  if (qIdx === -1) {
    url = `${url}?`
  }

  return Object.keys(params).reduce((accu, next, idx) => {
    const value = params[next]
    const preFix = idx === 0 ? '' : '&'

    accu += `${preFix}${next}=${value}`

    return accu
  }, url)
}
