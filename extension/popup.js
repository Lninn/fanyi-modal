console.log('123')

const port = chrome.runtime.connect({
  name: 'foo'
})

port.postMessage('Hi background.js')
port.onMessage.addListener((msg) => {
  console.log('Message recieved ' + msg)
})
