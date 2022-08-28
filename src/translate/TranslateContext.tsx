import { ActionType } from "@/type"
import React from "react"

function copy(text: string) {
  const input = document.createElement("textarea");
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand("copy");
  document.body.removeChild(input);
  return result;
}

const copyTextToClip = (text?: string) => {
  if (!text) return
  
  copy(text)
}

const playSound = (text?: string) => {
  if (!text) return

  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  msg.voice = voices[10]; 
  msg.volume = 1; // From 0 to 1
  msg.rate = 1; // From 0.1 to 10
  msg.pitch = 2; // From 0 to 2
  msg.text = text;
  msg.lang = "en";
  speechSynthesis.speak(msg);
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

export const TranslateProvider = ({
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
