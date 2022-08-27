import {
  IMessage
} from './action'
import { rejectModal, store } from './Modal'


console.log('content.js ...')

const __main = () => {

  const onRuntimeMessage = (
    message: IMessage, 
    _: any,
    sendResponse: (response: any) => void
  ) => {
    let appState

    if (message.type === 'start') {
      appState = {
        visible: true,
        loading: true,
      }
    } else if (message.type === 'end') {
      appState = {
        loading: false,
        ...message.payload,
      }
    } else if (message.type === 'error') {
      appState = {
        visible: false,
        loading: false,
      }
    }

    if (appState) {
      store.setState(appState)
    }

    console.log('onRuntimeMessage ', appState)

    sendResponse(true)
  }

  const handleMouseUp = (evt: MouseEvent) => {
    const selection = document.getSelection()

    if (!selection) return null;
  
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
    { type: '123' },
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
