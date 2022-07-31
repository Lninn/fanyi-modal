const main = () => {
  const commandId = 'Translate'

  chrome.contextMenus.create( {
    title: commandId + ' "%s"',
    id: commandId,
    contexts: ['selection'],
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

    chrome.notifications.create(
      {
        title: 'test',
        type: 'basic',
        message: 'test message',
        iconUrl: 'icon.png',
        requireInteraction: true,
      }
    )

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
