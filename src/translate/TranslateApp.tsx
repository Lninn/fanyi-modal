import { IAction, IActions, IDocument } from "@/type"
import React, { CSSProperties } from "react"

import CopyIcon from "../assets/copy"
import CollectIcon from "../assets/collect"
import ArrowIcon from "../assets/arrow"
import VolumeIcon from "../assets/volume"
import ThemeIcon from "../assets/theme"
import { TranslateContext } from "./TranslateContext"
import { CLS_REEFIX } from "./index"

const SOURCE_ACTIONS: IActions = [
  {
    type: "collect",
    desc: "收藏",
    icon: <CollectIcon />,
  },
  {
    type: "sound",
    desc: "声音",
    icon: <VolumeIcon />,
  },
]

const TARGET_ACTIONS: IActions = [
  {
    type: "copy",
    desc: "复制",
    icon: <CopyIcon />,
  },
  {
    type: "sound",
    desc: "声音",
    icon: <VolumeIcon />,
  },
]

interface TranslateAppProps {
  source: IDocument
  target: IDocument
  style: CSSProperties
}

const TranslateApp = ({ source, target, style }: TranslateAppProps) => {
  return (
    <div className={`${CLS_REEFIX}-modal`} style={style}>
      <div className={`${CLS_REEFIX}-modal-header`}>
        <div className={`${CLS_REEFIX}-modal-header-language`}>
          <span className={`${CLS_REEFIX}-modal-header-language-text`}>中文</span>
          <span className={`${CLS_REEFIX}-modal-header-language-icon`}>
            <ArrowIcon />
          </span>
          <span className={`${CLS_REEFIX}-modal-header-language-text`}>英文</span>
        </div>
        <div className={`${CLS_REEFIX}-modal-header-operate`}>
          <span className={`${CLS_REEFIX}-modal-header-operate-action`} title='切换主题'>
            <ThemeIcon />
          </span>
        </div>
      </div>
      <div className={`${CLS_REEFIX}-modal-content`}>
        <DocumentView doc={source} actions={SOURCE_ACTIONS} />

        <div className={`${CLS_REEFIX}-document-line`} />

        <DocumentView doc={target} actions={TARGET_ACTIONS} />
      </div>
    </div>
  )
}

interface DocumentViewProps {
  doc: IDocument
  actions: IActions
}

const DocumentView = ({ doc, actions }: DocumentViewProps) => {
  const { onCommand } = React.useContext(TranslateContext)

  const renderAction = (action: IAction) => {
    return (
      <div
        className={`${CLS_REEFIX}-document-operate-action`}
        onClick={() => onCommand(action.type, doc.text)}
        key={action.type}
        title={action.desc}
      >
        {action.icon}
      </div>
    )
  }

  return (
    <div className={`${CLS_REEFIX}-document`}>
      <div className={`${CLS_REEFIX}-document-text`}>{doc.text}</div>
      <div className={`${CLS_REEFIX}-document-operate`}>
        {actions.map((a) => {
          return renderAction(a)
        })}
      </div>
    </div>
  )
}

export default TranslateApp
