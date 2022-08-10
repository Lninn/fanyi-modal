import {
  CONTENT_LOAD,
  TRANSLATE_START,
  TRANSLATE_END,
  TRANSLATE_ERROR,
} from './action'
import { rejectModal, store } from './Modal.jsx'
import { debug } from './utils'


const __main = () => {

  const onRuntimeMessage = (request, _, sendResponse) => {
    let appState

    debug('content ', request.type)

    if (request.type === TRANSLATE_START) {
      appState = {
        visible: true,
        loading: true,
      }
    } else if (request.type === TRANSLATE_END) {
      appState = {
        loading: false,
        ...request.payload,
      }
    } else if (request.type === TRANSLATE_ERROR) {
      appState = {
        visible: false,
        loading: false,
      }
    }

    if (appState) {
      store.setState(appState)
    }

    sendResponse(true)
  }

  const handleMouseUp = (evt) => {
    const selection = document.getSelection()
  
    if (selection.type === 'Range') {
      const { x, y } = evt

      store.setState({
        left: x,
        top: y,
      })
    }
  }

  console.log('loading content.js...')

  rejectModal()

  chrome.runtime.sendMessage(
    { type: CONTENT_LOAD },
    function() {
      const err = chrome.runtime.lastError

      if (err) {
        console.log('[content] error', JSON.stringify(err))
      }
    }
  )

  chrome.runtime.onMessage.addListener(onRuntimeMessage)

  document.addEventListener('mouseup', handleMouseUp)
}

__main()
