import { htmlString } from './modal.jsx'


console.log('log from content.js...')

chrome.runtime.sendMessage({ type: 'content load' })

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('[content] ', request)
    sendResponse({ type: 'content is ok' })
  }
);

document.addEventListener('mouseup', (evt) => {
  const selection = document.getSelection()

  if (selection.type === 'Range') {
    const text = getHighlightText()
    const mouseInfo = getMouseInfo(evt)
    
    send({ q: text, info: mouseInfo })
  }
})

const getMouseInfo = (evt) => {
  const { pageX, pageY } = evt

  return {
    left: pageX,
    top: pageY,
  } 
}

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
const send = (payload) => {
  // console.log('[background-send] ', payload)
  chrome.runtime.sendMessage(payload)
}

const createUI = (contentString) => {
  const modalWrap = document.createElement('div')
  modalWrap.innerHTML = contentString
  document.body.append(modalWrap)
}

createUI(htmlString)
