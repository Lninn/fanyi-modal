import './TranslateApp.less'

import {
  IAction,
  IActions,
  IDocument
} from '@/type'
import React from 'react'

import copySvg from '@/assets/copy.svg'
import saveSvg from '@/assets/save.svg'
import volume from '@/assets/volume.svg'
import themeSvg from '@/assets/theme.svg'
import doubleArrowSvg from '@/assets/double-arrow.svg'
import { TranslateContext } from './TranslateModal'


const SOURCE_ACTIONS: IActions = [
  {
    type: 'collect',
    desc: '收藏',
    url: saveSvg
  },
  {
    type: 'sound',
    desc: '声音',
    url: volume,
  },
];

const TARGET_ACTIONS: IActions = [
  {
    type: 'copy',
    desc: '复制',
    url: copySvg,
  },
  {
    type: 'sound',
    desc: '声音',
    url: volume,
  }
]

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
          <span className={`${CLS_REEFIX}-modal-header-language-text`}>
            中文
          </span>
          <span className={`${CLS_REEFIX}-modal-header-language-icon`}>
            <img className={`${CLS_REEFIX}-img`} src={doubleArrowSvg} />
          </span>
          <span className={`${CLS_REEFIX}-modal-header-language-text`}>
            英文
          </span>
        </div>
        <div className={`${CLS_REEFIX}-modal-header-operate`}>
          <span title='切换主题'>
            <img className={`${CLS_REEFIX}-img`} src={themeSvg} />
          </span>
        </div>
      </div>
      <div className={`${CLS_REEFIX}-modal-content`}>
        <DocumentView 
          doc={source}
          actions={SOURCE_ACTIONS}
        />

        <div className={`${CLS_REEFIX}-document-line`} />

        <DocumentView
          doc={target}
          actions={TARGET_ACTIONS}
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
        onClick={() => onCommand(action.type, doc.text)}
        key={action.type}
        title={action.desc}
      >
        <img className={`${CLS_REEFIX}-img`} src={action.url} />
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

export default TranslateApp
