import { TranslateAppState } from "@/content"
import {  IDocument } from "@/type"
import { CSSProperties } from "react"
import TranslateApp from "./TranslateApp"
import { TranslateProvider } from "./TranslateContext"


const Translate = ({
  appState,
  style
}: {
  appState: TranslateAppState
  style: CSSProperties,
}) => {
  const source: IDocument = {
    lang: 'cn',
    text: appState.src
  }
  
  const target: IDocument = {
    lang: 'en',
    text: appState.dst
  }

  return (
    <TranslateProvider>
      <div>
        <TranslateApp
          source={source}
          target={target}
          style={style}
        />
      </div>
    </TranslateProvider>
  )
}

export default Translate
