import { createModal } from './modal.jsx'


console.log('log from content.js...')

chrome.runtime.sendMessage({ type: 'content load' })

let mouseInfo

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('[content] ', request, mouseInfo)

    const el = document.getElementById('fanyi-modal')
    if (request.type === 'translate-start') {

      el.style.display = 'block'

      if (mouseInfo) {
        el.style.left = mouseInfo.left + 'px'
        el.style.top = mouseInfo.top + 'px'
      }

      el.innerHTML = createModal('loading...')
    } else if (request.type === 'translate') {
      el.innerHTML = createModal(request.result)
    }

    sendResponse({ type: 'content is ok' })
  }
);

document.addEventListener('mouseup', (evt) => {
  const selection = document.getSelection()
 
  if (selection.type === 'Range') {
    const text = getHighlightText()
    mouseInfo = getMouseInfo(evt)
    
    send({ q: text })
  }
})

const getMouseInfo = (evt) => {
  const { x, y } = evt

  return {
    left: x,
    top: y,
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

const createUI = () => {
  const modalWrap = document.createElement('div')
  modalWrap.id = "fanyi-modal"
  modalWrap.innerHTML = createModal('loading...')

  document.body.append(modalWrap)
}

createUI()

// todo
window.addEventListener('click', () => {
  const el = document.getElementById('fanyi-modal')
  el.style.display = 'none'
})
