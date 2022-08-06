import {
  CONTENT_LOAD,
  TRANSLATE_START,
  TRANSLATE_END,
  TRANSLATE_ERROR,
} from './action'
import { rejectModal, store } from './Modal.jsx'


const __main = () => {

  const onRuntimeMessage = (request, _, sendResponse) => {
    let appState

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

  console.log('log from content.js...')

  rejectModal()

  chrome.runtime.sendMessage({ type: CONTENT_LOAD })

  chrome.runtime.onMessage.addListener(onRuntimeMessage)

  document.addEventListener('mouseup', handleMouseUp)
}

__main()
