import { getIconConfig, IconType } from "@/assets/getIconConfig"
import classNames from "classnames"

import "./Action.less"


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
    "action",
    { "interactive": !!onClick }
  )

  return (
    <span className={cls} title={config.title} onClick={onClick}>
     {config.svgDom}
    </span>
  )
}

export default Action
