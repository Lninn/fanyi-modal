console.log('log from content.js...')

document.addEventListener('mouseup', (e) => {
  const selection = document.getSelection()

  if (selection.type === 'Range') {
    const text = getHighlightText()
    
    // TODO read the click point, sync to background.js
    send(text)
  }
})

const getHighlightText = () => {
  const selection = window.getSelection()
  
  const {
    anchorNode,
    extentOffset,
    anchorOffset,
  } = selection

  const {
    textContent
  } = anchorNode

  const text = textContent.substring(
    extentOffset,
    anchorOffset
  )

  return text
}

// 通信
const send = (msg) => {
  chrome.runtime.sendMessage(msg)
}

// UI
const div = document.createElement('div')
div.classList.add('my-box')
document.body.append(div)
