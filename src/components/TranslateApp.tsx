import './TranslateApp.less'

import cls from 'classnames'
import {
  ActionType,
  IAction,
  IActions,
  IDocument
} from '@/type'
import React from 'react'


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
  const wrapCls = cls(
    `${CLS_REEFIX}-modal`
  )

  return (
    <div className={wrapCls}>
      <div className={`${CLS_REEFIX}-header`}>
        <div className={`${CLS_REEFIX}-header-language`}>
          CN - EN
        </div>
        <div className={`${CLS_REEFIX}-header-operate`}>
          <span>切换主题</span>
        </div>
      </div>
      <div className={`${CLS_REEFIX}-content`}>
        <DocumentView 
          doc={source}
          actions={[{ type:'collect' }, { type: 'sound' }]}
        />

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
        className={`${CLS_REEFIX}-document-action`}
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
