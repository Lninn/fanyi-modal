console.log('log from content.js...')

document.addEventListener('mouseup', (e) => {
  const selection = document.getSelection()

  console.log('debug ', e)
  
  if (selection.type === 'Range') {
    const text = selection.focusNode.textContent
    console.log('selection ', text);

    // TODO read the click point, sync to background.js
    send(text)
  }
})

// 通信
const send = (msg) => {
  chrome.runtime.sendMessage(msg)
}

// UI
const div = document.createElement('div')
div.classList.add('my-box')
document.body.append(div)
