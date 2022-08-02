const main = () => {
  const commandId = 'Translate'

  chrome.contextMenus.create( {
    title: commandId + ' "%s"',
    id: commandId,
    contexts: ['selection'],
  })

  // 通信
  let LATEST_MESSAGE = ''

  chrome.runtime.onMessage.addListener((msg) => {
    console.log('bg received msg ', msg)
    LATEST_MESSAGE = msg
  })

  chrome.contextMenus.onClicked.addListener((evt) => {
    const { menuItemId } = evt

    if (menuItemId === 'Translate') {
      fetch(LATEST_MESSAGE)
        .then(res => res.json())
        .then(res => {
          const { trans_result } = res
          const [{ src, dst }] = trans_result

          const msg = `${src}: ${dst}`
          notifications(msg)
        })
    }
  })

  chrome.runtime.onConnect.addListener((port) => {
    console.log('Connected... ', port)

    port.onMessage.addListener((msg) => {
      console.log('message recived ' + msg);
      port.postMessage('Hi Popup.js')
    })
  })
}

chrome.runtime.onInstalled.addListener(async () => {
  main()
})

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


// https://developer.chrome.com/docs/extensions/reference/action/
