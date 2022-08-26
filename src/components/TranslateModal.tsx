import { createDoc } from "@/Document"
import { ActionType, IDocument } from "@/type"
import React from "react"
import TranslateApp from "./TranslateApp"


const copyTextToClip = (text?: string) => {
  console.log('copy text ', text)
}

const playSound = (text?: string) => {
  console.log('play sound ', text)
}

const collectWord = (text?: string) => {
  console.log('collect word ', text)
}

const handleCommand = (type: ActionType, text?: string) => {
  switch (type) {
    case 'collect':
      collectWord(text)
      break
    case 'copy':
      copyTextToClip(text)
      break
    case 'sound':
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

const TranslateProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [context] = React.useState(initialTranslateContext)

  return (
    <TranslateContext.Provider value={context}>
      {children}
    </TranslateContext.Provider>
  )
}

const TranslateModal = () => {
  const [source] = React.useState<IDocument>(
    createDoc('cn')
  )
  const [target] = React.useState<IDocument>(
    createDoc('en')
  )

  return (
    <TranslateProvider>
      <TranslateApp
        source={source}
        target={target}
      />
    </TranslateProvider>
  )
}

export default TranslateModal
