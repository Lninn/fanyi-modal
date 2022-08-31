import Action from "@/components/Action"
import { createStore, initialState, useStore } from "@/store"
import { ActionType, IDocument, Lang, TranslateAppState } from "@/type"
import { copyTextToClip, playSound } from "@/utils"
import React, { CSSProperties } from "react"
import ReactDOM from "react-dom/client"

import "./Translate.less"


const LANGUAGE_MAP: Record<Lang, string> = {
  "CN": "中文",
  "EN": "英文"
}
const APP_ID = "CE-FANYI-ID"
export const CLS_REEFIX = "TRANSLATE-APP"

export const store = createStore(initialState)

const collectWord = (text?: string) => {
  console.log("collect word ", text)
}

const handleCommand = (type: ActionType, text?: string) => {
  switch (type) {
    case "collect":
      collectWord(text)
      break
    case "copy":
      copyTextToClip(text)
      break
    case "sound":
      playSound(text)
      break
  }
}

type ITranslateContext = {
  onCommand: (type: ActionType, text?: string) => void
  clsPrefix: string
}

const initialTranslateContext: ITranslateContext = {
  onCommand: handleCommand,
  clsPrefix: CLS_REEFIX,
}

export const TranslateContext = React.createContext(initialTranslateContext)

export const TranslateProvider = ({ children }: { children: React.ReactNode }) => {
  const [context] = React.useState(initialTranslateContext)

  return <TranslateContext.Provider value={context}>{children}</TranslateContext.Provider>
}

const Panel = ({
  text
}: { text: string }) => {
  const handleCopyClick = () => {
    copyTextToClip(text)
  }

  const handleVolumeClick = () => {
    playSound(text)
  }

  return (
    <div className="panel">
      <div className="panel-content">
        {text}
      </div>

      <div className="panel-actions">
        <Action iconType="copy" onClick={handleCopyClick} />
        <Action iconType="volume" onClick={handleVolumeClick} />
      </div>
    </div>
  )
}

export const Translate = ({ appState, style }: { appState: TranslateAppState; style?: CSSProperties }) => {
  const source: IDocument = {
    lang: "CN",
    text: appState.src,
  }

  const target: IDocument = {
    lang: "EN",
    text: appState.dst,
  }

  const handleThemeClick = () => {
    console.log("click theme")
  }

  return (
    <TranslateProvider>
      <div className="translate" style={style}>
        <div className="translate-header">
          <div className="translate-header-language">
            {LANGUAGE_MAP[source.lang]}
            <Action iconType="arrow" />
            {LANGUAGE_MAP[target.lang]}
          </div>

          <div className="translate-header-setting">
            <Action iconType="theme" onClick={handleThemeClick} />
          </div>
        </div>

        <div className="translate-content">
          <Panel text={source.text} />
          <div className="line"></div>
          <Panel text={target.text} />
        </div>
      </div>
    </TranslateProvider>
  )
}

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

export default reject
