import "./Translate.less"

import Translate from "./Translate"
import React, { CSSProperties } from "react"
import ReactDOM from "react-dom/client"
import { createStore, useStore } from "@/store"
import { IMessage } from "@/action"
import { log } from "@/utils"

// / config
const APP_ID = "CE-FANYI-ID"
export const CLS_REEFIX = "TRANSLATE-APP"

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

  src: "-",
  dst: "-",
}

export const store = createStore(initialState)

const App = () => {
  const appState = useStore(store)

  React.useEffect(() => {
    const handleUserClick = (evt: MouseEvent) => {
      // todo
      const target = evt.target as HTMLDivElement

      if (!target) return

      const clsSelector = `#${APP_ID}`
      if (!target.closest(clsSelector)) {
        store.setState({ visible: false })
      }
    }

    window.addEventListener("click", handleUserClick)

    return () => {
      window.removeEventListener("click", handleUserClick)
    }
  }, [])

  const style: CSSProperties = {
    position: "absolute",
    left: appState.left,
    top: appState.top,
    display: appState.visible ? "block" : "none",
    zIndex: 9999,
  }

  return <Translate style={style} appState={appState} />
}

const reject = () => {
  let rootDom = document.getElementById(APP_ID)

  if (!rootDom) {
    rootDom = document.createElement("div")
    rootDom.id = APP_ID

    document.body.append(rootDom)
  }

  const root = ReactDOM.createRoot(rootDom)
  root.render(<App />)
}

const __main = () => {
  const onRuntimeMessage = (message: IMessage, _: chrome.runtime.MessageSender, sendResponse: (response?: boolean) => void) => {
    let appState

    if (message.type === "start") {
      appState = {
        visible: true,
        loading: true,
      }
    } else if (message.type === "end") {
      appState = {
        loading: false,
        ...message.payload,
      }
    } else if (message.type === "error") {
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

  const handleMouseUp = (evt: MouseEvent) => {
    const selection = document.getSelection()

    if (!selection || store.getState().visible) return

    if (selection.type === "Range") {
      const { pageX, pageY } = evt

      store.setState({
        left: pageX,
        top: pageY,
      })
    }
  }

  console.log("loading content.js...")

  reject()

  chrome.runtime.sendMessage({ type: "load-content" } as IMessage, function () {
    const err = chrome.runtime.lastError

    if (err) {
      log.err(err.message)
    }
  })

  chrome.runtime.onMessage.addListener(onRuntimeMessage)

  document.addEventListener("mouseup", handleMouseUp)
}

__main()

// https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api
