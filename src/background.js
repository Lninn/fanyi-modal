import { md5 } from './utils'

const main = () => {
  const commandId = 'Translate'

  chrome.contextMenus.create( {
    title: commandId + ' "%s"',
    id: commandId,
    contexts: ['selection'],
  })

  let currentActiveTabId

  // 通信
  let LATEST_PAYLOAD = null

  chrome.runtime.onMessage.addListener((payload) => {
    LATEST_PAYLOAD = payload
  })

  chrome.contextMenus.onClicked.addListener((evt) => {
    const { menuItemId } = evt

    if (!LATEST_PAYLOAD) return
    // console.log({ menuItemId, LATEST_PAYLOAD })

    if (menuItemId === 'Translate') {
      const url = createTranslateUrl(LATEST_PAYLOAD.q)

      sendMessage(currentActiveTabId, { type: 'translate-start' })

      fetch(url)
        .then(res => res.json())
        .then(res => {
          if (res.error_code === '54001') {
            console.error('ERROR ', res.error_msg)
            return
          }

          const { trans_result } = res
          const [{ src, dst }] = trans_result

          const msg = `${src}: ${dst}`
          // notifications(msg)
          sendMessage(currentActiveTabId, { type: 'translate', result: msg })
        })
        .catch(err => {
          console.error(err)
        })
    }
  })

  chrome.runtime.onMessage.addListener(
    function(request, sender) {
      const { tab: { id } } = sender
      currentActiveTabId = id

      console.log(JSON.stringify(request))
    }
  );
}

chrome.runtime.onInstalled.addListener(async () => {
  main()
})

const sendMessage = (tabId, payload) => {
  if (!tabId) return

  chrome.tabs.sendMessage(
    tabId,
    payload,
    function(response) {
      if (!chrome.runtime.lastError) {
        console.log('[background] send ok, response ok ' + JSON.stringify(response))
      } else {
        console.log('[background] send ok, response not ok')
      }
    }
  )
}

const notifications = (msg) => {
  const notificationPayload = {
    title: 'test',
    type: 'basic',
    // todo
    message: msg || 'test message',
    iconUrl: 'icon.png',
    requireInteraction: false,
  }
  chrome.notifications.create(notificationPayload)
}

const BAIDU_URL = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
const APP_ID = '20220801001290121'
const KEY = 'yDr87UOd8xxpPYC0JjES'

const createTranslateUrl = (q) => {
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

// https://developer.chrome.com/docs/extensions/reference/action/
