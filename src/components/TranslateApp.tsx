import './TranslateApp.less'

import {
  ActionType,
  IAction,
  IActions,
  IDocument
} from '@/type'
import React from 'react'


interface CommandCtor {
  new(): ICommand
}

const commandList: ICommand[] = []

const makeCommand = (ctor: CommandCtor) => {
  return new ctor()
}

interface ICommand {
  handle: () => void
}

class CopyCommand implements ICommand {
  handle() {
    console.log('copy command')
  }
}

class PlayCommand implements ICommand {
  handle() {
    console.log('play command')
  }
}

class CollectCommand implements ICommand {
  handle() {
    console.log('collect command')
  }
}

commandList.push(
  ...[
    makeCommand(CopyCommand),
    makeCommand(PlayCommand),
    makeCommand(CollectCommand),
  ]
)

console.log(commandList)

const copyTextToClip = (text?: string) => {
  console.log('copy text ', text)
}

const playSound = (text?: string) => {
  console.log('play sound ', text)
}

const collectWord = (text?: string) => {
  console.log('collect word ', text)
}

type ITranslateContext = {
  onCommand: (type: ActionType) => void
}

const handleCommand = (type: ActionType) => {
  switch (type) {
    case 'collect':
      collectWord()  
      break
    case 'copy':
      copyTextToClip()
      break
    case 'sound':
      playSound()
      break
  }
}

const initialTranslateContext: ITranslateContext = {
  onCommand: handleCommand
}

const TranslateContext = React.createContext(initialTranslateContext)

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

interface TranslateAppProps {
  source: IDocument
  target: IDocument
}

const CLS_REEFIX = 'test-app'

const TranslateApp = ({
  source,
  target
}: TranslateAppProps) => {
  return (
    <div className={`${CLS_REEFIX}-modal`}>
      <div className={`${CLS_REEFIX}-modal-header`}>
        <div className={`${CLS_REEFIX}-modal-header-language`}>
          CN - EN
        </div>
        <div className={`${CLS_REEFIX}-modal-header-operate`}>
          <span>切换主题</span>
        </div>
      </div>
      <div className={`${CLS_REEFIX}-modal-content`}>
        <DocumentView 
          doc={source}
          actions={[{ type:'collect' }, { type: 'sound' }]}
        />

        <div className={`${CLS_REEFIX}-document-line`} />

        <DocumentView
          doc={target}
          actions={[{ type: 'copy' }, { type: 'sound' }]}
        />
      </div>
    </div>
  )
}

interface DocumentViewProps {
  doc: IDocument
  actions: IActions
}

const DocumentView = ({
  doc,
  actions
}:DocumentViewProps) => {
  const { onCommand } = React.useContext(TranslateContext)

  const renderAction = (action: IAction) => {
    return (
      <div
        className={`${CLS_REEFIX}-document-operate-action`}
        onClick={() => onCommand(action.type)}
      >
        Action
      </div>
    )
  }

  return (
    <div className={`${CLS_REEFIX}-document`}>
      <div className={`${CLS_REEFIX}-document-text`}>
        {doc.text}
      </div>
      <div className={`${CLS_REEFIX}-document-operate`}>
        {actions.map(a => {
          return renderAction(a)
        })}
      </div>
    </div>
  )
}

export const TranslateModal = () => {
  const [source] = React.useState<IDocument>({ lang: 'en', text: 'hello,world' })
  const [target] = React.useState<IDocument>({ lang: 'cn', text: '你好，世界' })

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
