export type Lang = "CN" | "EN"

export interface IDocument {
  lang: Lang
  text: string
}

export type ActionType = "collect" | "sound" | "copy"

export interface IAction {
  type: ActionType
  icon: JSX.Element
  desc: string
}

export type IActions = IAction[]

export type TransItem = {
  src: string
  dst: string
}

export type TranslateAppState = {
  visible: boolean
  loading: boolean

  left: number
  top: number

  src: string
  dst: string
}

