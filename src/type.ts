export type Lang = 'cn' | 'en'

export interface IDocument {
  lang: Lang
  text: string
}

export type ActionType = 'collect' | 'sound' | 'copy'

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

