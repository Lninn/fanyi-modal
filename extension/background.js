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
    })
  })
}

chrome.runtime.onInstalled.addListener(async () => {
  main()
})


// https://developer.chrome.com/docs/extensions/reference/action/
