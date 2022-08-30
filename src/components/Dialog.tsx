import { getIconConfig, IconType } from "@/assets/getIconConfig"
import { IDocument, Lang } from "@/type"
import classNames from "classnames"

import "./Dialog.less"

interface ActionProps {
  iconType: IconType
  onClick?: () => void
}

const Action = ({
  iconType,
  onClick,
}: ActionProps) => {
  const config = getIconConfig(iconType)

  if (!config) return null

  const cls = classNames(
    "icon",
    { "interactive": !!onClick }
  )

  return (
    <span className={cls} title={config.title} onClick={onClick}>
     {config.svgDom}
    </span>
  )
}

const Panel = ({
  text
}: { text: string }) => {
  const handleCopyClick = () => {
    console.log("copy")
  }

  const handleVolumeClick = () => {
    console.log("volume")
  }

  return (
    <div className="panel">
      <div className="panel-content">
        {text}
      </div>

      <div className="panel-actions">
        <Action iconType="copy" onClick={handleCopyClick} />
        <Action iconType="volume" onClick={handleVolumeClick} />
      </div>
    </div>
  )
}

const LANGUAGE_MAP: Record<Lang, string> = {
  "CN": "中文",
  "EN": "英文"
}

interface DialogProps {
  source: IDocument,
  target: IDocument
}

const Dialog = ({
  source,
  target
}: DialogProps) => {
  const handleThemeClick = () => {
    console.log("click theme")
  }

  return (
    <div className="dialog">
      <div className="dialog-header">
        <div className="dialog-header-language">
          {LANGUAGE_MAP[source.lang]}
          <Action iconType="arrow" />
          {LANGUAGE_MAP[target.lang]}
        </div>

        <div className="dialog-header-setting">
          <Action iconType="theme" onClick={handleThemeClick} />
        </div>
      </div>

      <div className="dialog-content">
        <Panel text={source.text} />
        <div className="line"></div>
        <Panel text={target.text} />
      </div>
    </div>
  )
}

export default Dialog
