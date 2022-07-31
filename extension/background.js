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
    const {
      editable,
      frameId,
      menuItemId,
      pageUrl,
      selectionText,
    } = evt

    console.log('hello', {
      editable,
      frameId,
      menuItemId,
      pageUrl,
      selectionText,
    }, chrome)

    // chrome.tabs.create({
    //   url: 'popup.html',
    // })

    // chrome.windows.create({
    //   url: chrome.runtime.getURL('popup.html'),
    //   type: 'popup',
    //   height: 300,
    //   left: 100,
    // })

    const notificationPayload = {
      title: 'test',
      type: 'basic',
      // todo
      message:  String(LATEST_MESSAGE) || 'test message',
      iconUrl: 'icon.png',
      requireInteraction: true,
    }
    console.log('notificationPayload ', notificationPayload)
    chrome.notifications.create(notificationPayload)

    chrome.tabs.query({}, (result) => {
      console.log('Tabs query ', result)
    })
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


// https://developer.chrome.com/docs/extensions/reference/action/
