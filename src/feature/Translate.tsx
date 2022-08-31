import Action from "@/components/Action"
import { ActionType, IDocument, Lang, TranslateAppState } from "@/type"
import { copyTextToClip, playSound } from "@/utils"
import React, { CSSProperties } from "react"

import "./Translate.less"


const LANGUAGE_MAP: Record<Lang, string> = {
  "CN": "中文",
  "EN": "英文"
}

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
}

const initialTranslateContext: ITranslateContext = {
  onCommand: handleCommand,
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
    console.log("copy")
  }

  const handleVolumeClick = () => {
    console.log("volume")
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

const Translate = ({ appState, style }: { appState: TranslateAppState; style?: CSSProperties }) => {
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
      <div className="translate">
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

export default Translate
