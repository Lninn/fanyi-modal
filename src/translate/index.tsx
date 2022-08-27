import './Translate.less'

import Translate from './Translate'
import React, { CSSProperties } from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, useStore } from '@/store'
import { IMessage } from '@/action'


console.log('content.js ...')

export type TranslateAppState = {
  visible: boolean
  loading: boolean

  left: number
  top: number

  src: string
  dst: string
}

const initialState: TranslateAppState = {
  visible: false,
  loading: false,

  left: 0,
  top: 0,

  src: '-',
  dst: '-',
}

export const store = createStore(initialState);

const App = () => {
  const appState = useStore(store)

  React.useEffect(() => {
    const handleUserClick = (evt: { target: any }) => {
      const target = evt.target
    
      const clsSelector = `#${rootId}`
      if (!target.closest(clsSelector)) {
        store.setState({ visible: false })
      }
    }

    window.addEventListener('click', handleUserClick)

    return () => {
      window.removeEventListener('click', handleUserClick)
    }
  }, [])

  const style: CSSProperties = {
    position: 'absolute',
    left: appState.left,
    top: appState.top,
    display: appState.visible ? 'block' : 'none',
    zIndex: 9999,
  }

  return (
    <Translate style={style} appState={appState} />
  );
}

const rootId = 'id-fanyi'

const rejectModal = () => {
  let rootDom = document.getElementById(rootId)
  
  if (!rootDom) {
    rootDom = document.createElement('div')
    rootDom.id = rootId

    document.body.append(rootDom)
  }

  const root = ReactDOM.createRoot(rootDom)
  root.render(<App />)
}

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

    if (!selection || store.getState().visible) return

    if (selection.type === 'Range') {
      const { pageX, pageY } = evt

      store.setState({
        left: pageX,
        top: pageY,
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

// https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
