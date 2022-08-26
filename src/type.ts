type Lang = 'cn' | 'en'

export interface IDocument {
  lang: Lang
  text: string
}

export type ActionType = 'collect' | 'sound' | 'copy'

export interface IAction {
  type: ActionType
}

export type IActions = IAction[]
